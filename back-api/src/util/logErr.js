const fs = require("fs/promises");

exports.logErr = async (controller,mess_err,res) => {
    try{
        const path = "./logs/" +controller+".txt";
        const logMessage = mess_err + "\n";
        await fs.appendFile(path,logMessage);
    }
    catch(error){
        console.log("Error writing to log file:", error);
    }
    res.status(500).send("Internal Server Error!");
};
