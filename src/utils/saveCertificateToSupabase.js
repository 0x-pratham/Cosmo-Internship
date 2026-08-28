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
    issued_at: new Date().toISOString(),
  })

  if (error) throw error
}