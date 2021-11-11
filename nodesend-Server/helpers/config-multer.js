const multer = require("multer");
const shortid = require("shortid");

const configuration = ( req ) => {

    const configMulter = {
        limits: { fileSize: req.email ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`)
            },
            // fileFilter: (req, file, cb) => {
            //     if(file.mimetype === "application/pdf") {
            //         return cb(null, true);
            //     }
            // }
        })
    }

    return configMulter;
}





module.exports = {
    configuration
}