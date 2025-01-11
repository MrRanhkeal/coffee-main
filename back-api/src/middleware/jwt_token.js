//call get token
//const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../util/config");
const {logErr} = require("../util/helper");

//verify token auth
exports.validate_token = () => {
    try{
        return(req,res,next) =>{
            var authorization = req.headers.authorization; //token from client
            var token_from_client = null;
            if(authorization != null && authorization != ""){
                token_from_client = authorization.split(" "); //authori : Bearer token "13fasd6f4a6dsfsadfiowero3u4r09eru0[9uf"
                token_from_client = token_from_client[1]; //get only access token

            }
            if(token_from_client == null){
                res.status(401).send({
                    message:"unauthorized",
                    error:"no token found"
                })
            }
            else{
                //verify jwt
                jwt.verify(token_from_client,config.config.token.access_token_key,(error,result) => {
                    if(error){
                        res.status(401).send({
                            message:"unauthorized",
                            error:"invalid token",
                            success:false
                        })
                    }
                    else{
                        req.currrent_id = result.data.profile.id;
                        req.profile = result.data.profile;
                        req.permission = result.data.permission;
                        next(); //continue controller
                    }
                })
            }
        }
    }
    catch(error){
        logErr("auth.validate_token",error,res);
        res.status(401).send({
            message:"unauthorized",
            error:"invalid token"
        })
    }
};

//generate access token_key
exports.getAccessToken = async(paramData) => {
    const access_token = await jwt.sign({
            data:paramData},
            config.config.token.access_token_key,{expiresIn:"2h"
        });
    return access_token;
}


//check token update When generating the token (e.g., during login), include the role and permissions:
// const getAccessToken = async (user) => {
//     const permissions = await RoleModel.getPermissionsByRole(user.role_id);
//     const token = jwt.sign(
//         { data: { profile: user, permissions } },
//         config.token.access_token_key,
//         { expiresIn: "1d" }
//     );
//     return token;
// };




