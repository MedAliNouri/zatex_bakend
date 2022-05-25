
const nodemailer = require('nodemailer')
const mailModel=require('../models/mailModel')
require('dotenv').config()
const path = require('path')
const handlebars = require('handlebars');
const fs = require('fs');
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
            
        }
        else {
            callback(null, html);
        }
    });
};
class MailService {

     async  sendMailResetPassword  (send_to,subject,hashedToken) {
      
   
       
        const filePath = path.join(__dirname, '../public/html/beefree-tkvp024xddj.html');
        var replacements = {
            token: hashedToken,
            link:process.env.FRONT_END_LINK_RESET_PASSWORD
       };
       this.readHtmlTemplateAndSend(filePath,replacements,send_to,subject)
       
    }
    async  sendMailVerification  (send_to,subject,name,hashedToken) {
      
        console.log("+++++++++++",process.env.MAIL_USER,process.env.MAIL_PASSWORD,)
           
            const filePath = path.join(__dirname, '../public/html/verification_mail.html');
            var replacements = {
                name: name,
                link:process.env.FRONT_END_LINK_VERIFY_EMAIL,
                code:hashedToken
           };
           this.readHtmlTemplateAndSend(filePath,replacements,send_to,subject)
           
        }




    readHtmlTemplateAndSend(filePath,replacements,send_to,subject){
        var transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            requireTLS: true,
            auth:{
                user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
        })
        // transporter.verify((err,sucess)=>{
        //     if(err){
        //         throw new Error(err)
        //     }
        // })
        readHTMLFile( filePath, function(err, html) {
            if(err){
                throw new Error(err)
                
            }
          
        
            var template = handlebars.compile(html);
            
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: process.env.MAIL_USER,
                to : send_to,
                subject : subject,
                html : htmlToSend
             };

             transporter.sendMail(mailOptions, function (error, response) {
                 console.log(response)
                if (error) {
                    console.log(error.message);
                    throw new Error("mail not sended")
                }
                mailModel.create(mailOptions)
                return response
            });
        });
    }
}

module.exports= new MailService()