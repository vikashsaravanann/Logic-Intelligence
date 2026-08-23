const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'logicwithvikash@gmail.com',
    pass: 'jrqpgfbcssndhnyf',
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: 'Logic Intelligence Technologies <logicwithvikash@gmail.com>',
      to: 'logicwithvikash@gmail.com',
      subject: 'Test Email - SMTP Configuration',
      text: 'This is a test email to verify the SMTP configuration is working.',
      html: '<p>This is a test email to verify the SMTP configuration is working.</p>',
    });
    console.log('Message sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main();
