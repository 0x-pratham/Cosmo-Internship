import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      type = "offer",

      // Shared Fields
      studentName,
      studentEmail,
      domainName,
      role,
      startDate,
      endDate,
      verificationLink,

      // Unique Fields
      offerId,
      certificateId,

      // Onboarding Fields
      candidateName,
      candidateEmail,
      onboardingId,
      department,
      joiningDate,
      verificationToken,
    } = req.body;

    // ==========================================
    // 1. PREMIUM OFFER LETTER EMAIL
    // ==========================================
    if (type === "offer") {
      const response = await resend.emails.send({
        from: "Cosmolix HR <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Congratulations! Your Offer Letter from Cosmolix - ${offerId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
                    <tr>
                      <td style="background-color: #1A1613; padding: 40px 30px; text-align: center;">
                        <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix" width="120" style="display: block; margin: 0 auto 20px auto; border: 0;" />
                        <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.5px;">Offer of Internship</h1>
                        <p style="color: #D35C18; font-size: 14px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Cosmolix Private Limited</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">Dear <strong>${studentName}</strong>,</p>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 25px 0;">
                          We are thrilled to extend this offer to join the Cosmolix team. Your skills and passion stood out to us, and we are confident that you will make a significant impact during your time with us.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9FAFB; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #E5E7EB;">
                          <tr>
                            <td style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Role</p>
                              <p style="font-size: 16px; color: #111827; margin: 0; font-weight: 600;">${role}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Department</p>
                              <p style="font-size: 16px; color: #111827; margin: 0; font-weight: 600;">${domainName}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Reference ID</p>
                              <p style="font-size: 14px; color: #111827; margin: 0; font-family: monospace; font-weight: 600;">${offerId}</p>
                            </td>
                          </tr>
                        </table>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                          Please review your official offer letter by clicking the button below.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="${verificationLink}" style="background-color: #D35C18; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block;">View Official Offer Letter</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; border-top: 1px solid #E5E7EB; background-color: #FAFAFA;">
                        <p style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 4px 0;">Ms. Pranali Sonar</p>
                        <p style="font-size: 13px; color: #6B7280; margin: 0 0 20px 0;">HR</p>
                        <p style="font-size: 12px; color: #9CA3AF; margin: 0; text-align: center;">
                          &copy; ${new Date().getFullYear()} Cosmolix Private Limited. All rights reserved.<br/>
                          Pune, Maharashtra, India
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
      return res.status(200).json({ success: true, message: "Email sent successfully", response });
    }

    // ==========================================
    // 2. PREMIUM ONBOARDING EMAIL
    // ==========================================
    if (type === "onboarding") {
      const response = await resend.emails.send({
        from: "Cosmolix HR <info@cosmolix.co.in>",
        to: candidateEmail,
        subject: `Welcome Aboard! Next Steps at Cosmolix`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
                    <tr>
                      <td style="background-color: #1A1613; padding: 40px 30px; text-align: center;">
                        <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix" width="120" style="display: block; margin: 0 auto 20px auto; border: 0;" />
                        <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.5px;">Welcome Aboard!</h1>
                        <p style="color: #D35C18; font-size: 14px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Your Journey Begins</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">Hi <strong>${candidateName}</strong>,</p>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 25px 0;">
                          We are absolutely delighted to welcome you to <strong>Cosmolix Private Limited</strong>. Your official onboarding process has begun, and we've prepared a personalized portal to get you started.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9FAFB; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #E5E7EB;">
                          <tr>
                            <td width="50%" style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Joining Date</p>
                              <p style="font-size: 15px; color: #111827; margin: 0; font-weight: 600;">${joiningDate}</p>
                            </td>
                            <td width="50%" style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Role</p>
                              <p style="font-size: 15px; color: #111827; margin: 0; font-weight: 600;">${role}</p>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Department</p>
                              <p style="font-size: 15px; color: #111827; margin: 0; font-weight: 600;">${department}</p>
                            </td>
                          </tr>
                        </table>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                          Access your Welcome Portal to view your digital pass, read guidelines, and connect with your team.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="${verificationLink}" style="background-color: #D35C18; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block;">Access Welcome Portal</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; border-top: 1px solid #E5E7EB; background-color: #FAFAFA;">
                        <p style="font-size: 12px; color: #9CA3AF; margin: 0; text-align: center;">
                          &copy; ${new Date().getFullYear()} Cosmolix Private Limited. All rights reserved.<br/>
                          Pune, Maharashtra, India
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
      return res.status(200).json({ success: true, message: "Onboarding email sent successfully", response });
    }

    // ==========================================
    // 3. PREMIUM CERTIFICATE EMAIL
    // ==========================================
    if (type === "certificate") {
      const response = await resend.emails.send({
        from: "Cosmolix HR <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Your Internship Certificate - ${certificateId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #E5E7EB;">
                    <tr>
                      <td style="background-color: #1A1613; padding: 40px 30px; text-align: center;">
                        <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix" width="120" style="display: block; margin: 0 auto 20px auto; border: 0;" />
                        <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0 0 10px 0; letter-spacing: -0.5px;">Program Completed</h1>
                        <p style="color: #D35C18; font-size: 14px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Congratulations</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">Dear <strong>${studentName}</strong>,</p>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 25px 0;">
                          We are incredibly proud to present your official Internship Completion Certificate. Thank you for your dedication and the impactful work you contributed to the <strong>${domainName}</strong> team.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9FAFB; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #E5E7EB;">
                          <tr>
                            <td style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Credential ID</p>
                              <p style="font-size: 14px; color: #111827; margin: 0; font-family: monospace; font-weight: 600;">${certificateId}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Duration</p>
                              <p style="font-size: 15px; color: #111827; margin: 0; font-weight: 600;">${startDate} to ${endDate}</p>
                            </td>
                          </tr>
                        </table>
                        <p style="font-size: 15px; color: #4B5563; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                          You can download and verify your digital certificate below. We wish you the absolute best in your future endeavors!
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="${verificationLink}" style="background-color: #D35C18; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px; display: inline-block;">Download Certificate</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px; border-top: 1px solid #E5E7EB; background-color: #FAFAFA;">
                        <p style="font-size: 14px; color: #111827; font-weight: 600; margin: 0 0 4px 0;">Ms. Pranali Sonar</p>
                        <p style="font-size: 13px; color: #6B7280; margin: 0 0 20px 0;">HR</p>
                        <p style="font-size: 12px; color: #9CA3AF; margin: 0; text-align: center;">
                          &copy; ${new Date().getFullYear()} Cosmolix Private Limited. All rights reserved.<br/>
                          Pune, Maharashtra, India
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
      return res.status(200).json({ success: true, message: "Certificate email sent successfully", response });
    }

    // ==========================================
    // 4. GENXCODE PARTICIPATION CERTIFICATE EMAIL
    // ==========================================
    if (type === "genxcode_certificate") {
      const response = await resend.emails.send({
        from: "GenXCode by Cosmolix <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Your GenXCode Certificate of Participation - ${certificateId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(27,5,62,0.08); border: 1px solid #E2E8F0;">

                    <!-- Header (Deep Purple GenXCode Theme) -->
                    <tr>
                      <td style="background-color: #1b053e; padding: 40px 30px; text-align: center;">
                        <!-- Using main logo as fallback, update to full URL of genxcode.svg if hosted -->
                        <img src="https://cosmolix.co.in/genxcode.svg" alt="GenXCode" width="70" style="display: block; margin: 0 auto 16px auto; border: 0; background-color: rgba(255,255,255,0.1); padding: 12px; border-radius: 12px;" />
                        <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px;">Certificate of Participation</h1>
                        <p style="color: #c7a6f3; font-size: 13px; font-weight: 600; margin: 0; text-transform: uppercase; letter-spacing: 2px;">GenXCode by Cosmolix</p>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="font-size: 16px; color: #334155; margin: 0 0 20px 0;">Hi <strong>${studentName}</strong>,</p>
                        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 25px 0;">
                          Thank you for bringing your energy, creativity, and problem-solving skills to the <strong>${domainName}</strong>! We are thrilled to award you this Certificate of Participation in recognition of your efforts and collaborative spirit.
                        </p>

                        <!-- Details Box (Light Purple Theme) -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #Faf5ff; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #e9d5ff;">
                          <tr>
                            <td style="padding-bottom: 15px;">
                              <p style="font-size: 12px; color: #6828a2; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Credential ID</p>
                              <p style="font-size: 14px; color: #1b053e; margin: 0; font-family: monospace; font-weight: 600;">${certificateId}</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p style="font-size: 12px; color: #6828a2; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Event Duration</p>
                              <p style="font-size: 15px; color: #1b053e; margin: 0; font-weight: 600;">${startDate} to ${endDate}</p>
                            </td>
                          </tr>
                        </table>

                        <p style="font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                          Click below to download and view your official high-resolution GenXCode certificate.
                        </p>

                        <!-- CTA (GenXCode Purple) -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center">
                              <a href="${verificationLink}" style="background-color: #6828a2; color: #FFFFFF; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 36px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 12px rgba(104, 40, 162, 0.25);">Download Certificate</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; border-top: 1px solid #F1F5F9; background-color: #F8FAFC;">
                        <p style="font-size: 14px; color: #1b053e; font-weight: 600; margin: 0 0 4px 0;">GenXCode Division</p>
                        <p style="font-size: 12px; color: #94A3B8; margin: 0; text-align: center; margin-top: 20px;">
                          &copy; ${new Date().getFullYear()} Cosmolix Private Limited. All rights reserved.<br/>
                          Pune, Maharashtra, India
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
      return res.status(200).json({ success: true, message: "GenXCode Certificate email sent successfully", response });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}