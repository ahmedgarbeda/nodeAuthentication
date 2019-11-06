const express = require('express');
const router= express.Router();
const reviewModel= require('../models/reviewModel');

router.get('/',async(req,res)=>{
    try{
        var reviews= await reviewModel.find().populate('reviewOnId').exec();
        return res.status(200).json(reviews);
    }
    catch(err){
       return res.status(500).json(err);
    }
})

router.post('/',async(req,res)=>{
   try{
        var reviewData=new reviewModel({
            review:req.body.review,
            reviewOnId: req.body.reviewOnId,
            reviewOn: req.body.reviewOn
        });
        var review= await reviewData.save();
        return res.status(200).json(review);
   }

    catch(err){
        return res.status(500).json(err);
    } 

    

})

router.get('/:id',async(req,res)=>{
    try{
        var review= await reviewModel.findById(req.params.id).populate('reviewOnId').exec();
        return res.status(200).json(review);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

router.patch('/:id',async(req,res)=>{
    try{
        var review= await reviewModel.updateOne({_id:req.params.id},{
            review:req.body.review,
        }).exec();
        return res.status(200).json(review);
    }
    catch(err){
        return res.status(500).json(err);
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        var review = await reviewModel.deleteOne({_id:req.params.id}).exec();
        return res.status(200).json(review);
    }
    catch(err){
       return res.status(500).json(err);
    }
})


module.exports=router;