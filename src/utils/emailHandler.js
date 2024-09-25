const nodemailer = require('nodemailer');


async function sendEmail({ fromEmail = 'ukpal777@gmail.com', toEmail, subject, text='', content }) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: 'smtp.example.com', //replace with your SMTP host
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
            user: fromEmail,
            pass: 'kxhbxusaubsltlgd',
        },
    });

    // const content = fs.readFileSync("./views/emailTemplates/forgotPassword.ejs");

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Happy Journey" <${fromEmail}>`, // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: content, // html body
    });

    console.log(`Message sent: ${info.messageId}`);
}

module.exports = sendEmail