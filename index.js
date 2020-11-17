const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
//const { getMaxListeners } = require("process");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/api/form",(req,res)=>{

  
    nodemailer.createTestAccount((err,account)=>{

        const htmlEmail = `
            <h3>Enviar correo con react</h3>
            <ul>
                <li>Email:${req.body.email}</li>
                <li>Asunto:${req.body.asunto}</li>
            </ul>
            <h3>Mensaje</h3>
            <p>${req.body.message}</p>
                `;
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            auth: {
                user: "bloqueprueba5@gmail.com",
                pass:"Prueba2123"
            }


        });
   
    let mailOptions = {
        from: "bloqueprueba5@gmail.com",
        to: req.body.email,
        replyTo: "bloqueprueba5@gmail.com",
        subject: req.body.asunto,
        text: req.body.mensaje,
        html: htmlEmail
    };
    transporter.sendMail(mailOptions,(err,info) => {
        if(err){
            return console.log(err);
        }
        console.log("Mensaje enviado: %s",info.mensaje);
        console.log("url del mensaje: %s",nodemailer.getTestMessageUrl(infor));

    });
});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>{
    console.log(`Servidor a la escucha del puerto ${PORT}`);
});

    