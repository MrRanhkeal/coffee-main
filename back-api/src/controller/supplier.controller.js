const {db, logErr} = require("../util/helper");

exports.getlist = async (req, res) => {
    try {
        var [list] = await db.query("SELECT * FROM suppliers");
        res.json({
            data: list,
            message: "success"
        })
    }
    catch (error) {
        logErr("supplier.getlist", error, res);
    }
}
