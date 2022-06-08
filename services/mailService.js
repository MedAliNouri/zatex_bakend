
const nodemailer = require('nodemailer')
const mailModel=require('../models/mailModel')
require('dotenv').config()
const path = require('path')
const handlebars = require('handlebars');
const fs = require('fs');
const {google} = require('googleapis')

const CLIENT_ID = "27716671923-dedb1kopf0mgbg8huo71ilup5bli8bhs.apps.googleusercontent.com"
const ClIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04dHkEz_TxDidCgYIARAAGAQSNwF-L9IryozePy1ogKPvkMNaHYyi6XpF5KCkLvoZ1RcGbLv1bAi4UK3OteH0uEhKIPIhkO4Kr1w"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,ClIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN})

async function sendMail(){

}
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




  async  readHtmlTemplateAndSend(filePath,replacements,send_to,subject){
        const accessToken = await oAuth2Client.getAccessToken()
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
           
            auth:{
                type: "OAuth2",
                user:"zatextech09@gmail.com",
            pass:"zatex12345",
            clientId:CLIENT_ID,
            clientSecret:ClIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        },
   
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