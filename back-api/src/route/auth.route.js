const {getlist,register,login,profile,logout,verify_email} = require("../controller/auth.controller");
const { logErr } = require("../util/logErr");
const {validate_token} = require("../middleware/jwt_token");
try{
    module.exports = (app) => {
        app.get("/auth",validate_token(),getlist);
        app.post("/auth",register);
        app.post("/auth/login",login);
        app.get("/auth/logout",validate_token(),logout);
        app.put("/auth/veriry-email",verify_email);
        app.get("/auth/profile",profile);
        
    }
}
catch(err){
    logErr("auth.route",err);
}


