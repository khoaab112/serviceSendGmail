var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const key = require('./privateKey')
dotenv.config();
const { MAIL } = process.env;
const { PASS } = process.env;

const sendMail = async(req, res, next) => {
    var label = req.body.label;
    var receiver = req.body.receiver;
    var titleMail = req.body.title;
    var content = req.body.content;
    var privateKey = req.body.privateKey;
    var timeUpLoad = req.body.time;



    if (!timeUpLoad) {
        res.send({ code: '-01', message: "Thiếu tham số time" });
        return;
    }
    if (!privateKey) {
        res.send({ code: '-01', message: "Thiếu tham số privateKey" });
        return;
    }
    let resultCheck = key.confirmRights(privateKey, timeUpLoad)
    if (resultCheck === -1) {
        res.send({ code: '-03', message: "Thời gian không hợp lệ" });
        return;
    } else if (resultCheck === -2) {
        res.send({ code: '-02', message: "Mã không hợp lệ" });
        return;
    }
    if (!label) {
        label = 'HTH-WARNING'
    }
    if (!receiver) {
        res.send({ code: '-01', message: "Thiếu tham số receiver" });
        return;
    }
    if (!titleMail) {
        res.send({ code: '-01', message: "Thiếu tham số title" });
        return;
    }
    if (!content) {
        res.send({ code: '-01', message: "Thiếu tham số content" });
        return;
    }
    var transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        service: 'gmail',
        auth: {
            user: MAIL,
            pass: PASS
        }
    });
    var mailOptions = {
        from: ' ' + label + ' <' + MAIL + '>',
        to: receiver,
        subject: titleMail,
        html: content
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send({ 'code': '-01', message: 'lỗi hệ thống' });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ code: '00', message: 'gửi thành công cho : ' + receiver });

        }
    });

}
module.exports = {
    sendMail
}