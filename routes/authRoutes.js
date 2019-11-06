const user=require('../models/userModel');
const accessTocken= require('../models/accessTockens');
const uuid=require('uuid');
const bcrypt= require('bcrypt');
const express=require('express');
const router= express.Router();
router.post('/login',async(req,res)=>{
    try{
       // console.log(req.body);
                
        const userData = await user.findOne({email : req.body.email}).exec();             
         
        if(userData){
            if(bcrypt.compareSync(req.body.password,userData.password)){
                var tocken=uuid();
               // console.log(tocken);
                
                try{
                    
                    var newTockentObj=new accessTocken({
                        accessTocken: tocken,
                         userId: userData._id
                    })
                    await newTockentObj.save({});

                    return res.status(200).json({tocken:tocken});
                }
                catch(err){
                    return res.status(500).json(err);
                }
                
            }
            
            
        }


    }
    catch(err){
        return res.status(500).json(err);
    }
})

router.post("/register",async(req,res)=>{
    try{
        var userData=new user({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        });
    
        var user = await userData.save();
        return res.redirect("/login");
    }
    catch(err){
        return res.status(500).json(err);
    }
})

module.exports=router;