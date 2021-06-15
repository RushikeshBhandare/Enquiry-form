const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.user,
        pass:process.env.pass
    }
})

app.post('/send', async(req, res)=>{
    try{
        console.log(req.body.email)
        const mailOptions= {
            from: req.body.email,// senders email address
            to: process.env.user, //list of recivers
            subject: req.body.subject, //subject line 
            html: `
                <p>you have a new contact requiret </p>
                <h3>Contact details</h3>
                <ul>
                    <li>${req.body.name}</il>
                    <li>${req.body.email}</il>
                    <li>${req.body.subject}</il>
                    <li>${req.body.massage}</il>
                </ul>
            `
        }

        //sends actual email
        await transporter.sendMail(mailOptions, (err, info)=>{
            if(err){
                console.log(err)
                res.status(500).send({
                    success: false,
                    massage: "something went wrong"
                })
            }else{
                res.send({
                    success:true,
                    massage: 'thanks for contacting us. we will get back ot you shortly '
                })
            }
        })


    }catch(error){
        res.status(500).send({
            success: false,
            massage:"something went wrong. try agin leter catch "
        })
    }
})

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`SERVER IS RUNING ON PORT ${port}`)
})