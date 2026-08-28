import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import GenXCodeCertificate from "@/components/letter/GenXCodeCertificate"
import LoadingButton from "@/components/ui/LoadingButton"
import { getNextCertificateId } from "@/utils/getNextCertificateId"
import { exportCertificatePdf } from "@/utils/exportCertificatePdf"
import { saveCertificateToSupabase } from "@/utils/saveCertificateToSupabase"

// Make sure to import your GenXCode domains here
import { genxcodeDomains } from "@/data/genxcodeDomains"

export default function GenXCodeDashboard() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    studentName: "Student Name",
    studentEmail: "",
    domainKey: "arcade_event",
    startDate: "",
    endDate: "",
  })

  const [certificateId, setCertificateId] = useState("")
  const [isIdEditable, setIsIdEditable] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const CERT_WIDTH = 1123
  const CERT_HEIGHT = 794

  const previewRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = previewRef.current
    if (!el) return

    const updateScale = () => {
      const availableWidth = el.clientWidth
      setScale(Math.min(availableWidth / CERT_WIDTH, 1))
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  // Auto-generate ID on load
  useEffect(() => {
    const generateInitialId = async () => {
      try {
        const newId = await getNextCertificateId(
          formData.domainKey,
          "GENX"
        )

        setCertificateId(newId)
      } catch (error) {
        console.error("INITIAL CERT ID ERROR:", error)
      }
    }

    generateInitialId()
  }, [])

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "domainKey" && !isIdEditable) {
      getNextCertificateId(value, "GENX")
        .then(setCertificateId)
        .catch((error) =>
          console.error("DOMAIN CERT ID ERROR:", error)
        )
    }
  }

  const formatDateForPreview = (dateString) => {
    if (!dateString) return ""

    const dateObj = new Date(dateString)

    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  // Selected GenXCode event
  const selectedDomain = genxcodeDomains[formData.domainKey]

  const handleExportPdf = async () => {
    try {
      setIsExporting(true)
      setExportError(null)

      if (!formData.studentEmail) {
        throw new Error("Student email is required.")
      }

      const formattedStartDate =
        formatDateForPreview(formData.startDate) ||
        formData.startDate

      const formattedEndDate =
        formatDateForPreview(formData.endDate) ||
        formData.endDate

      const pdfUrl = await exportCertificatePdf({
        studentName: formData.studentName,
        certificateId,
        template: "genxcode",
      })

      await saveCertificateToSupabase({
        certificateId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        domainKey: formData.domainKey,
        domainName: selectedDomain?.domainName ?? "",
        role: selectedDomain?.role ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        pdfUrl,
      })

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "genxcode_certificate",
          studentName: formData.studentName,
          studentEmail: formData.studentEmail,
          domainName: selectedDomain?.domainName ?? "",
          role: selectedDomain?.role ?? "",
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          certificateId,
          verificationLink: pdfUrl,
        }),
      })

      const result = await emailResponse.json()

      if (!emailResponse.ok || !result.success) {
        throw new Error(
          result.message || "Saved, but failed to send email."
        )
      }

      alert(
        "GenXCode Certificate Exported & Email Sent Successfully!"
      )
    } catch (error) {
      setExportError(
        error.message || "Failed to process certificate."
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-[1600px] mx-auto grid grid-cols-[420px_1fr] gap-8 p-8">

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[28px] shadow-xl border border-purple-100 p-8 h-fit sticky top-8">

          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-[#1b053e]"
              style={{
                fontFamily: '"Times New Roman", serif',
              }}
            >
              GenXCode Certificate
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Issue specialized GenXCode completion certificates.
            </p>
          </div>

          <div className="space-y-6">

            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Full Name
              </label>

              <input
                type="text"
                value={formData.studentName}
                onChange={(e) =>
                  handleChange("studentName", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6828a2]"
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Email
              </label>

              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) =>
                  handleChange("studentEmail", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6828a2]"
              />
            </div>

            {/* Event Track */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Track
              </label>

              <select
                value={formData.domainKey}
                onChange={(e) =>
                  handleChange("domainKey", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6828a2] bg-white"
              >
                <option value="arcade_event">
                  GenXCode Arcade
                </option>

                <option value="coding_challenge">
                  Rapid Coding Challenge
                </option>

                <option value="ui_hackathon">
                  UI/UX Design Sprint
                </option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date
                </label>

                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleChange("startDate", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6828a2] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date
                </label>

                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    handleChange("endDate", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6828a2] cursor-pointer"
                />
              </div>

            </div>

            {/* Certificate ID */}
            <div className="bg-gradient-to-br from-[#1b053e] to-[#3d126b] rounded-3xl p-6 shadow-lg">

              <div className="flex items-center justify-between">

                <p className="text-xs uppercase tracking-[0.25em] text-[#c7a6f3]">
                  Certificate No.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setIsIdEditable((prev) => !prev)
                  }
                  className="text-[11px] font-semibold text-white hover:text-gray-200"
                >
                  {isIdEditable ? "Lock" : "Edit"}
                </button>

              </div>

              {isIdEditable ? (
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) =>
                    setCertificateId(e.target.value)
                  }
                  className="mt-3 w-full bg-[#1b053e] text-white text-lg font-bold tracking-[0.1em] rounded-lg px-3 py-2 outline-none border border-[#6828a2] focus:border-[#c7a6f3]"
                />
              ) : (
                <p className="mt-3 text-xl font-bold text-white tracking-[0.18em] break-all">
                  {certificateId}
                </p>
              )}

            </div>

            {/* Export Error */}
            {exportError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {exportError}
              </div>
            )}

            {/* Generate */}
            <LoadingButton
              loading={isExporting}
              onClick={handleExportPdf}
            >
              Generate GenXCode Certificate
            </LoadingButton>

          </div>
        </div>

        {/* =========================================================
            Preview Section
        ========================================================== */}
        <div
          ref={previewRef}
          className="pb-20"
          style={{
            width: "100%",
            position: "relative",
          }}
        >

          {/* -------------------------------------------------------
              1. Visible Preview
              Scaled down to fit available screen width.
          -------------------------------------------------------- */}
          <div
            style={{
              width: CERT_WIDTH * scale,
              height: CERT_HEIGHT * scale,
            }}
          >
            <div
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <GenXCodeCertificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={
                  formatDateForPreview(formData.startDate) ||
                  formData.startDate
                }
                endDate={
                  formatDateForPreview(formData.endDate) ||
                  formData.endDate
                }
                certificateId={certificateId}
              />
            </div>
          </div>

          {/* -------------------------------------------------------
              2. Hidden Render Target

              IMPORTANT:
              exportCertificatePdf looks for:
              #certificate-render-target

              This copy remains at full 1123x794 resolution and is
              positioned outside the visible viewport so the user
              doesn't see a duplicate certificate.
          -------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: CERT_WIDTH,
              height: CERT_HEIGHT,
              overflow: "hidden",
            }}
          >
            <div
              id="certificate-render-target"
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
              }}
            >
              <GenXCodeCertificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={
                  formatDateForPreview(formData.startDate) ||
                  formData.startDate
                }
                endDate={
                  formatDateForPreview(formData.endDate) ||
                  formData.endDate
                }
                certificateId={certificateId}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}