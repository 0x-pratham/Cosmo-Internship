import signature from "@/assets/signatures/signature1.png"
import stamp from "@/assets/stamps/stamp1.svg"
import chevron from "@/assets/logo/chevron.png"

export default function GenXCodeCertificate({
  studentName = "Student Name",
  domainName = "Domain Name",
  role = "",
  startDate = "Start Date",
  endDate = "End Date",
  certificateId = "GENX-CERT-000000",
  issueDate,
}) {
  const issued = issueDate || endDate || "Date"
 
  return (
    <div
      className="relative overflow-hidden mx-auto bg-white"
      style={{
        width: "1123px",
        height: "794px",
        fontFamily: '"Google Sans Flex", system-ui, sans-serif',
        color: "#1e293b",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px -10px rgba(0,0,0,0.1)",
      }}
    >
      {/* ---------- Right Body Panel (Background & Watermark) ---------- */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(104, 40, 162, 0.04) 0%, transparent 60%)",
          zIndex: 1
        }}
      />

      {/* ---------- Left Panel (Deep Purple Brand Column) ---------- */}
      <div
        className="absolute left-0 top-0 h-full shadow-[8px_0_32px_rgba(27,5,62,0.15)] flex flex-col justify-between"
        style={{ 
          width: "320px", 
          background: "linear-gradient(170deg, #160431 0%, #2f0e54 50%, #4a1584 100%)", 
          zIndex: 2 
        }}
      >
        {/* Top: Logo & Brand Name */}
        <div style={{ padding: "72px 48px 0" }}>
          <div 
            className="flex items-center justify-center mb-8" 
            style={{ 
              width: "72px", 
              height: "72px", 
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
            }}
          >
            {/* LOGO UPDATED TO LOCAL PUBLIC PATH */}
            <img 
              src="/genxcode.svg" 
              alt="GenXCode" 
              crossOrigin="anonymous"
              style={{ width: "44px", height: "44px", objectFit: "contain" }} 
            />
          </div>

          <h2
            style={{
              color: "#ffffff",
              fontFamily: '"Times New Roman", serif',
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            GenXCode
          </h2>

          <p
            style={{
              color: "#c7a6f3",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: "12px",
              opacity: 0.9
            }}
          >
            By Cosmolix
          </p>
        </div>
 
        {/* Middle: Abstract Chevron Overlay */}
        <div className="relative flex-1 flex items-center overflow-hidden w-full">
          <img
            src={chevron}
            alt=""
            style={{
              position: "absolute",
              left: "-40px",
              width: "400px",
              height: "auto",
              opacity: 0.06,
              mixBlendMode: "plus-lighter"
            }}
          />
        </div>
 
        {/* Bottom: Secure Credential Badge */}
        <div style={{ padding: "0 48px 72px" }}>
          <div 
            style={{ 
              background: "rgba(0,0,0,0.2)", 
              borderRadius: "12px", 
              padding: "16px 20px",
              border: "1px solid rgba(199, 166, 243, 0.15)"
            }}
          >
            <p
              style={{
                color: "#a78bfa",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "6px",
                fontWeight: 600
              }}
            >
              Credential No.
            </p>

            <p
              style={{
                color: "#ffffff", 
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "15px",
                letterSpacing: "0.1em",
                fontWeight: 500,
              }}
            >
              {certificateId || "PENDING"}
            </p>
          </div>
        </div>
      </div>
 
      {/* ---------- Right Body Panel (Content) ---------- */}
      <div
        className="absolute top-0 h-full flex flex-col"
        style={{ left: "320px", right: 0, padding: "80px 88px", zIndex: 3 }}
      >
        
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <div style={{ width: "48px", height: "2px", backgroundColor: "#6828a2" }} />

            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#6828a2",
              }}
            >
              Certificate of Participation
            </p>
          </div>
  
          <h1
            style={{
              fontFamily: '"Times New Roman", serif',
              fontWeight: 700,
              fontSize: "56px",
              color: "#160431",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Certificate of Completion
          </h1>
        </div>

        {/* Core Content Section */}
        <div style={{ marginTop: "64px", maxWidth: "720px" }}>
          <p 
            style={{ 
              fontSize: "15px", 
              color: "#64748b", 
              textTransform: "uppercase", 
              letterSpacing: "0.2em", 
              fontWeight: 600,
              marginBottom: "20px"
            }}
          >
            This is proudly presented to
          </p>
          
          <div style={{ marginBottom: "36px" }}>
            <span
              style={{
                fontFamily: '"Times New Roman", serif',
                fontSize: "46px",
                fontWeight: 700,
                color: "#160431",
                borderBottom: "3px solid #160431",
                display: "inline-block",
                paddingBottom: "16px",
                paddingRight: "32px",
                minWidth: "350px",
                lineHeight: 1.2
              }}
            >
              {studentName}
            </span>
          </div>
          
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.9,
              color: "#334155",
              textAlign: "justify"
            }}
          >
            for actively participating as a{" "}
            <strong style={{ color: "#160431", fontWeight: 700 }}>
              {role || "Participant"}
            </strong>{" "}
            in the{" "}
            <strong style={{ color: "#160431", fontWeight: 700 }}>
              {domainName}
            </strong>{" "}
            organized by{" "}
            <strong style={{ color: "#160431", fontWeight: 700 }}>
              GenXCode by Cosmolix
            </strong>
            , from{" "}
            <strong style={{ color: "#160431", fontWeight: 700 }}>
              {startDate || "[Start Date]"}
            </strong>{" "}
            to{" "}
            <strong style={{ color: "#160431", fontWeight: 700 }}>
              {endDate || "[End Date]"}
            </strong>
            . The participant demonstrated genuine enthusiasm, a collaborative
            approach, and a strong commitment to active learning and
            interactive problem-solving throughout the event.
          </p>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer Section */}
        <div className="flex items-end justify-between w-full mt-10">
          
          {/* Issue Date */}
          <div style={{ paddingBottom: "16px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b", fontWeight: 700 }}>
              Date of Issue
            </p>

            <p style={{ fontSize: "17px", fontWeight: 700, marginTop: "8px", color: "#160431" }}>
              {issued}
            </p>
          </div>

          {/* Stamp and Signature Container */}
          <div className="flex items-center" style={{ gap: "56px", marginRight: "16px" }}>
            
            {/* Stamp */}
            <img
              src={stamp}
              alt="Official Stamp"
              style={{ 
                height: "108px", 
                width: "108px", 
                objectFit: "contain", 
                opacity: 0.9,
                transform: "translateY(12px) rotate(-2deg)", 
              }}
            />
            
            {/* Signature Area */}
            <div className="flex flex-col items-center">
              <img 
                src={signature} 
                alt="Authorized Signature" 
                style={{ 
                  height: "64px", 
                  objectFit: "contain", 
                  marginBottom: "12px",
                  opacity: 0.95
                }} 
              />

              <div style={{ width: "240px", borderTop: "2px solid #e2e8f0", paddingTop: "12px", textAlign: "center" }}>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#160431", letterSpacing: "0.02em" }}>
                  Authorized Signatory
                </p>

                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
                  GenXCode Division
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}