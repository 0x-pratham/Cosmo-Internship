import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { supabase } from "@/lib/supabase"
 
export async function exportCertificatePdf({ studentName, certificateId }) {
  const node = document.getElementById("certificate-render-target")
 
  if (!node) {
    throw new Error("Certificate preview not found on the page.")
  }
 
  // 1. Force strict dimensions and GenXCode white background
  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#FFFFFF",
    width: 1123,
    height: 794,
    windowWidth: 1123,
    windowHeight: 794,
  })
 
  const imgData = canvas.toDataURL("image/png")
  
  // 2. Map PDF directly to your exact layout dimensions instead of generic "a4"
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [1123, 794], 
  })
 
  pdf.addImage(imgData, "PNG", 0, 0, 1123, 794)
 
  const pdfBlob = pdf.output("blob")
 
  const fileName = `${certificateId}-${studentName.replace(/\s+/g, "_")}.pdf`

  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(fileName, pdfBlob, {
      contentType: "application/pdf",
      upsert: true,
    })
 
  if (uploadError) throw uploadError
 
  const { data } = supabase.storage.from("certificates").getPublicUrl(fileName)
 
  return data.publicUrl
}