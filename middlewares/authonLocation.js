
let jwt=require("jsonwebtoken")
 
require("dotenv").config()

let redis=require("ioredis")

const configuation={
    host: "redis-19106.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port:19106,
    username:"default",
    password:process.env.redispass
}

let redisClient=new redis(configuation)

let authlocation=async(req,res,next)=>{
    
   try{

    let acctoken=req.headers.authorization.split(" ")[1]
    let isblacklisted=await redisClient.get(acctoken)
    if(isblacklisted){
        res.send("login please")
    }
    else{

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
   }
   catch(err){
    res.send(err)
   }

}

module.exports={authlocation}