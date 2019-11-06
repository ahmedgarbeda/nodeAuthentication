const accessTocken=require('../models/accessTockens');
module.exports=async(req,res,next)=>{
  var tocken=req.get("authorization");
  if(!tocken) return res.status(401).json("Access Denied");
  const exisitTocken=await accessTocken.findOne({accessTocken: tocken}).populate('userId',"-password -__v");
  if(! exisitTocken) return res.status(401).json("Access Denied");
  //console.log(exisitTocken);
  
  req.user=exisitTocken.userId;
  next()
}
