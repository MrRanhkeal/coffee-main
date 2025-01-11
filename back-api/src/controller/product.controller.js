const {db, logErr} = require("../util/helper");
exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM products");
        res.json({
            data:list,
            message:"success"
        })
        // var list = "product list";
        // res.json({
        //     data:list,
        //     message:"success"
        // })
    } 
    catch (error) {
        logErr("product.getlist",error,res);
    }
};

exports.create = async (req, res) => {
    try{
        var sql = "insert into products(category_id,barcode,name,brand,description,qty,price,discount,image,create_by) values(:category_id,:barcode,:name,:brand,:description,:qty,:price,:discount,:image,:create_by)";
        var [data] = await db.query(sql,req.body);
        res.json({
            data:data,
            message:"success"
        })
    }
    catch(error){
        logErr("product.create",error,res);
    }
};
exports.update = async (req, res) => {
    try {
        var sql = "update products set category_id=:category_id,barcode=:barcode,name=:name,brand=:brand,description=:description,qty=:qty,price=:price,discount=:discount,image=:image where id=:id";
        var [data] = await db.query(sql,req.body);
        res.json({
            data:data,
            message:"success"
        })
    } 
    catch (error) {
        logErr("product.update",error,res);
    }
};
exports.remove = async (req, res) => {
    try {
        var sql = "delete from products where id=:id";
        var [data] = await db.query(sql,req.body);
        res.json({
            data:data,
            message:"success"
        })
    } 
    catch (error) {
        logErr("product.remove",error,res);
    }
};
