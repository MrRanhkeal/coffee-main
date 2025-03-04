const {db, logErr} = require("../util/helper");
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
//const config = require("../util/config");
const {getAccessToken} = require("../middleware/jwt_token");
//const { text } = require("body-parser");

exports.getlist = async (req, res) => {
    try {
        let sql =
            "select " +
            "u.id, " +
            "u.role_id, " +
            "u.name, " +
            "u.username, " +
            "u.create_by, " +
            "u.is_active, " +
            "r.name as role_name " +
            "from users u " +
            "inner join roles r on u.role_id = r.id";
            const [list] = await db.query(sql);
            const [role] = await db.query("select id as value, name as label from roles");
            res.json({
                data:list,
                roles:role,
                message:"success"
            })
        // var list = "auth list";
        // res.json({
        //     data:list,
        //     message:"success"
        // })
    } 
    catch (error) {
        logErr("auth.getlist",error,res);
    }
};

exports.register = async (req, res) => {
    try {
        let password = req.body.password;
        password = bcrypt.hashSync(password,10); //123456789fasdfsdf#$2332
        var sql = "INSERT INTO users (role_id,name,username,password,create_by) values "+
            "(:role_id,:name,:username,:password,:create_by)"; //is params
        let data = await db.query(sql,
            {
                role_id:req.body.role_id,
                name:req.body.name,
                username:req.body.username,
                password:password,
                // is_active:req.body.is_active,
                create_by:req.body.create_by
            });
        res.json({
            data:data,
            message:"success"
        })
    }
    catch (error) {
        logErr("auth.register",error,res);
    }
};
exports.login = async (req, res) => {
    try {
        let {username,password} = req.body;
        let sql = 
            " select " +
            " u.*," +
            " r.name as role_name" +
            " from users u " +
            " inner join roles r on u.role_id = r.id" +
            " where u.username=:username ";

        let [data] = await db.query(sql,{username:username});
        if(data.length == 0){
            res.json({
                error:{
                    message:"username does't exist"
                }, //pro data
            });
            return;
        }
        else{
            let dbPassword = data[0].password;
            let isMatch = bcrypt.compareSync(password,dbPassword); //this compare true and false pass
            if(!isMatch){
                res.json({
                    error:{
                        message:"password does't match, please try again...!"
                    }, //pro data
                });
                return;
            }
            else{
                delete data[0].password;
                let obj ={
                    profile:data[0],
                    permission:["view","create","update","delete"]
                }
                res.json({
                    message:"login success",
                    ...obj, //this javascript spread operator (...) allows us to quickly copy the contents all part of an existing object into another object
                    // get token
                    access_token: await getAccessToken(obj)
                });
                return;
            }
        }
    }
    catch (error) {
        logErr("auth.login",error,res);
    }
};

exports.profile = async (req, res) => {
    try {
        res.json({
            profile: req.profile,
            message:"success"
        })
    }
    catch (error) {
        logErr("auth.profile",error,res);
    }
};

//logout
exports.logout = async (req, res) =>{
    try{
        //const userId = req.profile; //check this
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None",
            expire:new Date(0) //cookie will expire js
        }
        res.clearCookie("access_token",cookiesOption);
        res.status(200).json({
            message:"logout successfully",
            error:"false",
            success:"true"
        });
    }
    catch(err){
        logErr("auth.logout",err,res);
    }
}
//forgot password
exports.forgot_password = async (req, res) => {
    try{
        const { email } = req.body;

        // Check if user exists
        let sql = "SELECT * FROM users WHERE email = :email";
        let [user] = await db.query(sql, { email });
        if(user.length ===0){
            return res.status(400).json({
                message: "Email does not exist",
                error: true,
                success: false
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        const expiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

        // Store OTP and expiry in database
        let updateSql = "UPDATE users SET forgot_password_otp = :otp, forgot_password_expiry = :expiry WHERE email = :email";
        await db.query(updateSql, { otp, expiry, email });

        // Send OTP to user's email (pseudo-code, replace with your email logic)
        await sendEmail({
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 15 minutes.`
        });

        res.status(200).json({
            message: "OTP sent to your email",
            error: false,
            success: true
        })
    }
    catch(err)
    {
        logErr("auth.forgot_password",err,res); 
    }
}

//reset password
exports.reset_password = async (req, res) => {
    try{
        const { email, otp, newPassword } = req.body;

        // Validate user and OTP
        let sql = "SELECT * FROM users WHERE email = :email";
        let [user] = await db.query(sql, { email });

        if(user.length === 0){
            return res.status(400).json({
                message: "Email does not exist",
                error: true,
                success: false
            });
        }
        
        const dbOtp = user[0].forgot_password_otp;
        const dbExpiry = new Date(user[0].forgot_password_expiry);
        if(otp !== dbOtp){
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update password in database
        let updateSql = "UPDATE users SET password = :newPassword, forgot_password_otp = NULL, forgot_password_expiry = NULL WHERE email = :email";
        await db.query(updateSql, { newPassword: hashedPassword, email });
        res.status(200).json({
            message: "Password reset successfully",
            error: false,
            success: true
        })
    }
    catch(err){
        logErr("auth.reset_password",err,res);
    }
}
exports.verify_email = async (req, res) => {
    try{

    }
    catch(err)
    {
        logErr("auth.verify_email",err,res); 
    }
}


// exports.validate_token = () => {
//     try{
//         return(req,res,next) =>{
//             var authorization = req.headers.authorization; //token from client
//             var token_from_client = null;
//             if(authorization != null && authorization != ""){
//                 token_from_client = authorization.split(" "); //authori : Bearer token "13fasd6f4a6dsfsadfiowero3u4r09eru0[9uf"
//                 token_from_client = token_from_client[1]; //get only access token

//             }
//             if(token_from_client == null){
//                 res.status(401).send({
//                     message:"unauthorized",
//                     error:"no token found"
//                 })
//             }
//             else{
//                 //verify jwt
//                 jwt.verify(token_from_client,config.config.token.access_token_key,(error,result) => {
//                     if(error){
//                         res.status(401).send({
//                             message:"unauthorized",
//                             error:"invalid token",
//                             success:false
//                         })
//                     }
//                     else{
//                         req.currrent_id = result.data.profile.id;
//                         req.profile = result.data.profile;
//                         req.permission = result.data.permission;
//                         next(); //continue controller
//                     }
//                 })
//             }
//         }
//     }
//     catch(error){
//         logErr("auth.validate_token",error,res);
//         res.status(401).send({
//             message:"unauthorized",
//             error:"invalid token"
//         })
//     }
// };

// const getAccessToken = async (paramData) => {
    
//     const access_token = await jwt.sign({ data: paramData }, config.config.token.access_token_key, { expiresIn: "12h" });
//     return access_token;
// };
//generate access token_key
// exports.getAccessToken = async(paramData) => {
//     const access_token = await jwt.sign({
//             data:paramData},
//             config.config.token.access_token_key,{expiresIn:"12h"
//         });
//     return access_token;
// }