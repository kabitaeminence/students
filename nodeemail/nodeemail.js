var nodemailer = require('nodemailer');
const  path = require('path');

const sendmail = async (req, res) => {
  console.log(__dirname,"@@@@@@@@")

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    TLS: true,
    port: 587,
    auth: {
      user: 'test.dev788@gmail.com',
      pass: 'admin@1234!'
    }
  });

var mailOptions = {
  from: "test.dev788@gmail.com",
  to: "kabita20@navgurukul.org",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  attachments: [
        {
            filename: 'Taj.jpg',
            path: path.join(__dirname, '../image/Taj.jpg'),

        }
        ]  
 };
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    res.send(error)
    console.log(error)
  }
  else {
    console.log('Email sent successfully: ' + info.response);
    res.send('Email sent successfully: ' + info.response);
  }
});
}

module.exports = { sendmail };
