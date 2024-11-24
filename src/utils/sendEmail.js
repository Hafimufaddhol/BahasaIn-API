const nodemailer = require('nodemailer');

const sendEmail = async ({ to, token }) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; // URL reset password

    // Konfigurasi transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opsi email dengan HTML
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Reset Password - YourApp',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #007bff;">Reset Password</h2>
          <p>Halo,</p>
          <p>Anda menerima email ini karena Anda (atau seseorang) telah meminta reset password untuk akun Anda.</p>
          <p>
            Klik tautan berikut untuk mengatur ulang password Anda:
            <br>
            <a href="${resetLink}" style="color: #007bff; text-decoration: none;">Reset Password</a>
          </p>
          <p>
            Jika Anda tidak meminta reset ini, abaikan email ini. Tautan akan kedaluwarsa dalam 1 jam.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 0.9em; color: #666;">
            Jika Anda mengalami masalah dengan tautan di atas, salin dan tempel URL berikut ke browser Anda:
            <br>
            <span style="color: #007bff;">${resetLink}</span>
          </p>
          <p style="font-size: 0.9em; color: #666;">Terima kasih,<br>Tim YourApp</p>
        </div>
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };
