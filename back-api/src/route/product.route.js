const {getlist,create,update,remove} = require("../controller/product.controller");
const { logErr } = require("../util/logErr");

try{
    module.exports = (app) =>{
        app.get("/product/getlist",getlist);
        app.post("/product/create",create);
        app.put("/product/update",update);
        app.delete("/product/delete",remove);
    }
}
catch(err){
    logErr("product.route",err);
}