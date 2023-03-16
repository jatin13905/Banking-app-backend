const express = require("express");
const router = express.Router();
const cmodel = require("../../models/cmodel");
const emodel = require("../../models/emodel");
const auth = require("../../authentication/auth");
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors())
router.use(express.json());


router.get('/profile',auth,(req,res)=>{
    
    res.send(req.verify_user);

})

router.post('/registercustomer',(req,res)=>{

    const{name,padd,cadd,email,num,Idname,Idnum,expdate,pass} = req.body;

    const account_number = Math.random()*100000;
    
    let accountNo = Math.trunc(account_number);


    const new_user = new cmodel({name,padd,cadd,email,num,Idname,Idnum,expdate,pass,accountNo});

    new_user.getToken();

    new_user.save();
    
    res.sendStatus(200);
});




router.post('/logincustomer',async(req,res)=>{
    
    const{Idnum,pass} = req.body;


    const data = await cmodel.findOne({Idnum:Idnum});

    
    const id = data.Idnum;
    const password = data.pass;


    if(data && pass===password){

        const token = await data.getToken();

        res.cookie("jwtoken",token,{
            httpOnly:true,
            secure:true,
            // expires:new Date(Date.now()+500000)
        });

        await data.save();

        res.status(200).json("Success");


    }else{
        res.status(400).json("Fail");

    }

});


router.post('/loginemp',auth,async(req,res)=>{
    const{empId,emppass} = req.body;

    const edata = await emodel.findOne({empId:empId});


});


router.post('/tranferMoney',async(req,res)=>{

    try{

    const{myAcc,myAccTo,amount} = req.body;

    const amt = ~~amount;

    const sender = myAcc;
    const receiver = myAccTo;

    const user = await cmodel.findOne({accountNo:sender});
    
    const user2 = await cmodel.findOne({accountNo:receiver});

    const sender_Bal = user.accountBal;
    const reciver_Bal = user2.accountBal;

    if(sender_Bal === 0){
        res.status(400).send();
    }
    if(!user2){
        res.status(400).send("User Not Found");
    }else if(!user){
        res.status(400).send("User Not Found");
    }


    const amountToBeUpdated = reciver_Bal+amt;

    const amountToBeDeducted = sender_Bal-amt;


    const newBal =  await cmodel.findByIdAndUpdate(user._id,{accountBal:amountToBeDeducted});

    const newBal2 =  await cmodel.findByIdAndUpdate(user2._id,{accountBal:amountToBeUpdated});

    res.status(200).send();

    await newBal.save();
    await newBal2.save();
   

    


    }catch(e){
        res.status(400).send(e);
    }
    

})




module.exports = router; 