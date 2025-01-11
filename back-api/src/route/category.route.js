const {getlist,create,update,remove} = require("../controller/category.controller");
const { logErr } = require("../util/logErr");
const {validate_token} = require("../middleware/jwt_token");
const { admin } = require("../middleware/auth/admin");

try{
    module.exports = (app) => {
        app.get("/category/getlist",validate_token(),getlist);
        app.post("/category/create",admin,create); //test admin
        app.put("/category/update",update);
        app.delete("/category/delete",remove);
    }
}
catch(err){
    logErr("category.route",err);
}