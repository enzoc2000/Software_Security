import nodemailer from "nodemailer";
export async function sendOTPEmail(to: string, otp: string) {
  // 1) genero un account Ethereal gratuito
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: `"MFA Demo" <${testAccount.user}>`,
    to,
    subject: "Il tuo codice OTP",
    text: `Il tuo codice OTP per completare il login è: ${otp}`,
  });
  console.log("info", info);

  console.log("Anteprima email:", nodemailer.getTestMessageUrl(info));
}