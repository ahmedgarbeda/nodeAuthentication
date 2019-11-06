const express = require('express');
const router= express.Router();
const userModel= require('../models/userModel');
const postModel= require('../models/postModel');
const reviewModel= require('../models/reviewModel');
const bcrypt=require('bcrypt');


router.get('/',async(req,res)=>{
    
    try{
        var users= await userModel.find().exec();
        return res.status(200).json(users);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


router.post('/',async(req,res)=>{
    //console.log('here2');
    try{
        
        var userData=new userModel({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
        });
    
        var user = await userData.save();
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err);
    }
});

router.get('/:id',async(req,res)=>{
    
    try{
        var user=await userModel.findById(req.params.id).exec();
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

router.patch('/:id',async(req,res)=>{
    
    try{
        var result=await userModel.updateOne({_id:req.params.id},{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        }).exec();

        return res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json(err);
    }
})


router.delete('/:id',async(req,res)=>{
    
    try{
        var result=await userModel.deleteOne({_id:req.params.id}).exec();
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err);
    }
})


router.get('/:id/posts',async(req,res)=>{
    
    try{
        var posts=await postModel.find({userId:req.params.id}).populate("userId","-password").exec();
        return res.status(500).json(posts)
    }
    catch(err){
        return res.status(500).json(err);
    }
})

router.get('/:id/review',async(req,res)=>{
    
    try{
        var reviews= await reviewModel.find({reviewOnId:req.params.id}).populate('reviewOnId').exec();
        return res.status(200).json(reviews);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


module.exports=router;