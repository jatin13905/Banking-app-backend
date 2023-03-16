const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cust_schema = mongoose.Schema({
    name:String,
    padd : String,
    cadd : String,
    email : String,
    num : Number,
    Idname : String,
    Idnum : Number,
    expdate : String,
    pass : String,
    accountNo : Number,
    accountBal : Number,
    tokens:[{
        token:{
            type : String,
        require : true
        }
    }]
});

//producing new token everytime this function is called
cust_schema.methods.getToken = async function(){    
    const fresh_token = jwt.sign({_id:this._id.toString()},"qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm");
    this.tokens = this.tokens.concat({token:fresh_token});

    return fresh_token;
}


const cust_model = mongoose.model("Customer_Model",cust_schema);

module.exports = cust_model;