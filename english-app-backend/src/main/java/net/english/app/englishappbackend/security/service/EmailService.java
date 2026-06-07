package net.english.app.englishappbackend.security.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;

  public void sendVerificationEmail(String to, String token) throws MessagingException {

    MimeMessage message = mailSender.createMimeMessage();

    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(to);

    helper.setFrom("Easy English <easyenglish515253@gmail.com>");

    helper.setSubject("Email verification");

    String html = """
            <!doctype html>
                    <html lang="en">
                      <body style="margin:0;padding:0;background:#f6fbff;font-family:Arial,Helvetica,sans-serif;color:#183153;">
                        <div style="max-width:560px;margin:0 auto;padding:24px;">
                          <div style="background:#fff;border-radius:18px;overflow:hidden;border:1px solid #e6eef8;">
                            <div style="padding:22px;text-align:center;background:linear-gradient(135deg,#39c6ff 0%,#7b5cff 100%);color:#fff;">
                              <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:700;opacity:.9;">Easy English</div>
                              <h1 style="margin:10px 0 0;font-size:24px;line-height:1.2;">Verify your email</h1>
                            </div>

                            <div style="padding:28px 24px;text-align:center;">
                              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#35506d;">
                                Use this 6-digit code to confirm your email address.
                              </p>

                              <div style="display:inline-block;padding:16px 22px;background:#f2f7ff;border:2px dashed #7b5cff;border-radius:14px;font-size:32px; font-weight:800;letter-spacing:8px;color:#183153;">
                                {{TOKEN}}
                              </div>

                              <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#7a8aa0;">
                                If you did not request this code, you can ignore this email.
                              </p>
                            </div>
                          </div>
                        </div>
                      </body>
                    </html>
        """;

    String htmlBody = html.replace("{{TOKEN}}", token);

    String plain = "Verify your email\n\n" +
        "Use this 6-digit code to confirm your email address:\n\n" +
        token + "\n\n" +
        "If you did not request this code, you can ignore this email.";

    helper.setText(plain, htmlBody);

    mailSender.send(message);
  }

}
