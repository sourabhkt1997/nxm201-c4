
let jwt=require("jsonwebtoken")
 
require("dotenv").config()

let auth=async(req,res,next)=>{
    
   try{
    let acctoken=req.headers.authorization.split(" ")[1]
     let isvalid=jwt.verify(acctoken,process.env.secret)
     if(!isvalid){
        res.send("not a valid token")
     }
     else{
        token=acctoken
         req.token=token
        next()
     }
   }
   catch(err){
    res.send(err)
   }

}



module.exports={auth}