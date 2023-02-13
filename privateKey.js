const dotenv = require('dotenv');
dotenv.config();
const { SECRETKEY } = process.env;

// nhận mã & time theo định nghĩa từ trước
function confirmRights(uploadHash, uploadTime) {
    // var systemTime = Date.now();
    var systemTime = Math.floor(Date.now() / 1000);
    var token = "secretKey=" + SECRETKEY + "&time=" + uploadTime;
    // console.log(token)
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256').update(token).digest('hex');
    //     console.log(hash)
    //     console.log(uploadHash)

    if (uploadTime < systemTime) {
        return -1;
    }
    return (hash === uploadHash ? 0 : -2);
}
module.exports = {
    confirmRights
}