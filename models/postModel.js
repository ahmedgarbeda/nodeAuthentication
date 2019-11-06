const mongoose = require('mongoose');
const postModel=mongoose.Schema({
    title:String,
    body: String,
    userId: {type : mongoose.Schema.Types.ObjectId, ref:"user"},
    
});

const post= mongoose.model('post',postModel);

module.exports=post;