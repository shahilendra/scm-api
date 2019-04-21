const fs = require('fs');
const Styliner = require('styliner');
const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "sheelu.test@gmail.com",
        pass: "Test@123"
    }
});

exports.send =  function(data) {
	var mailOptions= {
    to : data.to,
    subject : data.subject,
    text : data.text,
    html: data.html
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error) {
      console.log(error);
      // res.end("error");
    } else {
      console.log("Message sent: " + JSON.stringify(response));
      // res.end("sent");
    }
  });
}

exports.testEmail = ()=> {
  let html = './public/blog-stories.html'
  // let message = `Hi ${user.firstName} ${user.firstName} you are login in application from follow details`;
  fs.readFile(html, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    // styliner.processHTML(data)
    // .then((source) => {
      exports.send({to: 'sheelu.imsg@gmail.com', subject: 'Test Email send ✔', html: data});
      fs.writeFile("./public./newindex.html", data, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    //});
  });
}