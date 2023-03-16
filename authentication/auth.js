const jwt = require('jsonwebtoken');
const customerModel = require("../models/cmodel");

const auth = async(req,res,next) =>{

    try{

        const token = req.cookies.jwtoken;

        // console.log(token);
        const auth_user = jwt.verify(token,"qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm");

        const verify_user = await customerModel.findOne({_id:auth_user._id,"tokens.token":token});

        if(!verify_user){
            throw new Error("User Not Authenticated");
        }

        req.token = token;
        req.verify_user = verify_user;
        req.userId = verify_user._id;

        next();


    }catch(e){res.status(402)}

}

module.exports = auth;