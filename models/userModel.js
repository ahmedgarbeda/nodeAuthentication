const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const userModel=mongoose.Schema({
    firstName:String,
    lastName: String,
    phone: String,
    email: String,
    password: String
});


const user= mongoose.model('user',userModel);


// function validateUser(user) {
//     const schema = {
//       firstName: Joi.string().min(3).max(20).required(),
//       lastName: Joi.string().min(3).max(20).required(),
//       phone: Joi.string().min(8).max(11).required(),
//       email: Joi.string().min(5).max(255).required().email(),
//       password: Joi.string().min(3).max(255).required()
//     };
  
//     return Joi.validate(user, schema);
// }



module.exports=user;
//module.exports.validate=validateUser;