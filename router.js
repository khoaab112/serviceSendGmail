const express = require('express');
const router = express.Router();

const sendMailAPI = require('./sendMail')

router.post('/sendMail', sendMailAPI.sendMail)

module.exports = {
    router
}