const nodemailer = require('nodemailer');

import path from 'path';
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const mailSender = {
    sendGmail: function (param) {
        const transporter = nodemailer.createTransport({
            service: 'gmail'
            , prot: 587
            , host: 'smtp.gmlail.com'
            , secure: false
            , requireTLS: true
            , auth: {
                user: process.env.Email,
                pass: process.env.Email_Password
            }
        });

        // 메일 옵션
        const mailOptions = {
            from: process.env.Email,
            to: param.toEmail, // 수신할 이메일
            subject: param.subject, // 메일 제목
            text: param.text // 메일 내용
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
}
