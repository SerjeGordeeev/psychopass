var nodemailer = require('nodemailer');
var sendgrid = require('sendgrid')('SerjeGordeev')


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'sergeygordeev95@gmail.com',
        pass: '$$RocK95'
    }
});


module.exports = function(mail){
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'FIST', // sender address
        to: mail, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world 🐴', // plaintext body
        html: '<b>Hello world 🐴</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}