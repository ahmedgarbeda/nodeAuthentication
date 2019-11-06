const express = require('express');
const router= express.Router();
const postModel= require('../models/postModel');
const reviewModel= require('../models/reviewModel');

router.get('/',async(req,res)=>{
    
    try{
        var posts= await postModel.find().populate('userId',"-password").exec();
        return res.status(200).json(posts);
    }
    catch(err){
       return res.status(500).json(err);
    }
})

router.post('/',async(req,res)=>{
   try{
        var postrData=new postModel({
            title:req.body.title,
            body: req.body.body,
            userId: req.body.userId
            
        });
        var post=await postrData.save();
       return res.status(200).json(post);
   }
   catch(err){
      return res.status(500).json(err);
   }
    
    
    

})

router.get('/:id',async(req,res)=>{
    try{
        var post = await postModel.findById(req.params.id).populate('userId',"-password").exec();
       return res.status(200).json(post);
    }
    
    catch(err){
       return res.status(500).json(err);
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        var post= await postModel.updateOne({_id:req.params.id},{
            title:req.body.title,
            body: req.body.body,
        }).exec();
       return res.status(200).json(post);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        var post= await postModel.deleteOne({_id:req.params.id}).exec();
       return res.status(200).json(post);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


router.get('/:id/review',async(req,res)=>{
    try{
        var reviews = await reviewModel.find({reviewOnId:req.params.id}).populate('reviewOnId').exec();
        return res.status(200).json(reviews);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


module.exports=router;