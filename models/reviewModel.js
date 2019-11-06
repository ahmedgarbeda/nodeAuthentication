const mongoose = require('mongoose');
const reviewModel=mongoose.Schema({
    review:String,
    reviewOnId: {type: mongoose.Schema.Types.ObjectId, refPath:"reviewOn"},
    reviewOn:{
        type:String,
        enum:['user','post']
    }
    
});

const review= mongoose.model('review',reviewModel);

module.exports=review;