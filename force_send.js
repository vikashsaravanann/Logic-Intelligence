const nodemailer = require("nodemailer");
const target = "createwithvikash@gmail.com";

const getTransporter = (user, pass) => nodemailer.createTransport({
  host: "smtp.zoho.in", port: 587, secure: false, auth: { user, pass }
});

async function run() {
  const tHello = getTransporter("hello@logicintelligencetechnologies.in", "eGhbxft9SgMq");
  const tNoReply = getTransporter("no-reply@logicintelligencetechnologies.in", "TCexmw5vHfJX");

  console.log("Sending Free Demo (hello)...");
  await tHello.sendMail({
    from: '"Logic Intelligence Technologies" <hello@logicintelligencetechnologies.in>',
    to: target,
    subject: "We received your request. (Logic Intelligence Technologies)",
    html: `<h1>Thanks for requesting a Free Demo!</h1><p>This is a forced test confirming the hello@ account works.</p>`
  });

  console.log("Sending Welcome Email (no-reply)...");
  await tNoReply.sendMail({
    from: '"Logic Intelligence Technologies" <no-reply@logicintelligencetechnologies.in>',
    to: target,
    subject: "Welcome to Logic Intelligence Technologies!",
    html: `<h1>Welcome!</h1><p>This is a forced test confirming the no-reply@ account works.</p>`
  });
  
  console.log("Done.");
}
run();
