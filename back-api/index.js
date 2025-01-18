const express = require("express");
//const bodyParser = require("body-parser"); //use for helps when need to know more than just the URL being hit
const cors = require("cors");
const app = express();

//app.use(express.json());
app.use(express.json()); //new
//app.use(bodyParser.json()); //new
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true })); //new
app.use(cors({origin: "*"}));

//cors is cross origin resource sharing for protexted webrowser to prevent unauthorized access
app.get("/", (req, res) => {
    const list = [
        {
            id: 1,
            name: "ranh",
            gender: "male"
        }
    ];
    res.json({
        data: list,
        message: "success"
    });
});

try{
    require("./src/route/auth.route")(app);
    require("./src/route/category.route")(app);
    require("./src/route/config.route")(app);
    require("./src/route/customer.route")(app);
    require("./src/route/invoice.route")(app);
    require("./src/route/order_items.route")(app);
    require("./src/route/order.rotue")(app);
    require("./src/route/product.route")(app);
    require("./src/route/role.route")(app);
    require("./src/route/supplier.route")(app);
}
catch(err){
    //console.log(err);
}
const port =8080;
app.listen(port, () => {
    console.log("http://localhost:" + port);
});