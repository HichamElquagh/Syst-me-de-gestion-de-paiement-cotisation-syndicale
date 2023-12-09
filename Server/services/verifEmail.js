
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
  const host = process.env.HO_ST;
  const userName = process.env.USER_NAME_;
  const password = process.env.PASS_WORD;
  console.log(host,userName,password);



const verififemail = async (email,subject,link)=>{

    
    const transport = nodemailer.createTransport({
        host:host,
        port: 2525,
        auth: {
            user: userName,
            pass: password,
              }
        });
      
      const mailOptions = {
        from: 'hicham@support.com',
        to: email, 
        subject: subject,
        text: 'Welcome ',
        html: `<p>Click the button below to ${subject}</p>
        <a href=${link} style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin-top: 20px;">${subject}</a>
        
        `
      };
      
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('error for mail :'+error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};
    

module.exports = verififemail;