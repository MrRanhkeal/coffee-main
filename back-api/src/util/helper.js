const connection = require("./connection");
const {logErr} = require("./logErr");
const {config} = require("./config");
const fs = require("fs/promises");
const multer = require("multer");
//multer is handling file upload multi/form-data

exports.db = connection;
exports.logErr = logErr;
exports.toInt = ()=>{
    return true
};

exports.isArray = (data)=>{
    return true
};

exports.isEmpty = (value) => {
    if(value == null || value == undefined || value == "" || value == "undefined" || value == "null") {
        return true;
    }
    return false;
};

exports.isEmail = (data) => {
    return true;
};

exports.formartDateServer = (data) => {
    return true;
};

exports.formartDateClient = (data) => {
    return true;
};
exports.uploadFile = multer({
    storage: multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, config.image_path);
        },
        filename: function(req, file, callback){
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            callback(null, file.fieldname + '-' + uniqueSuffix);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    //please chech when something error
    fileFilter: function(req, file, callback){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null, true);
        }
        else{
            callback(null, false);
        }
    }
});
exports.removeFile = async (fileName) => {
    try {
        var filePath = config.image_path + fileName;
        await fs.unlink(filePath);
        return "file deleted successfully";
    } catch (error) {
        console.log(error); 
    }
};