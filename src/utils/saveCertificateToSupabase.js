import { supabase } from "@/lib/supabase"

export async function saveCertificateToSupabase({
  certificateId,
  studentName,
  studentEmail,
  domainKey,
  domainName,
  role,
  startDate,
  endDate,
  pdfUrl,
  certificateType = 'COSMOLIX', // Default to COSMOLIX backward compatibility ke liye
}) {
  const { error } = await supabase.from("certificates").insert({
    certificate_id: certificateId,
    student_name: studentName,
    student_email: studentEmail,
    domain_key: domainKey,
    domain_name: domainName,
    role,
    start_date: startDate,
    end_date: endDate,
    pdf_url: pdfUrl,
    certificate_type: certificateType, // Supabase ke naye column se mapped
    issued_at: new Date().toISOString(),
  })

  if (error) throw error
}