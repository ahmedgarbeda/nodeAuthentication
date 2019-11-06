var mongoose= require('mongoose');

const accessTockensModel=mongoose.Schema({
    accessTocken:String,
    userId:{type: mongoose.Schema.Types.ObjectId , ref:"user"}
});

const tocken=mongoose.model('tocken',accessTockensModel)

module.exports=tocken;