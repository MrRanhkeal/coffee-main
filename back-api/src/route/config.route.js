const {getlist} = require("../controller/config.controller");
const { validate_token } = require("../middleware/jwt_token");

try{
    module.exports = (app) => {
        app.get("/config",validate_token(),getlist);
    };
}
catch(err){
    // console.log(firstErr);
}