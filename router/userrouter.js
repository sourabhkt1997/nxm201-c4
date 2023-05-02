let express=require("express")

let {UserModel}=require("../models/user.model")

let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
require("dotenv").config()

let userrouter=express.Router()
let {auth}=require("../middlewares/auth")

const redis= require('ioredis')

const configuation={
    host: "redis-19106.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port:19106,
    username:"default",
    password:process.env.redispass
}

let redisClient=new redis(configuation)





userrouter.post("/register",async(req,res)=>{
    let {name,email,password}=req.body
    try{
         let isalreadypresent=await UserModel.findOne({email})
         if(isalreadypresent){
            res.status(400).send("already registerd login please")
         }
         else{
            bcrypt.hash(password,5,async(err, hash)=> {
            let data=new UserModel({name,email,password:hash})
            await data.save()
            res.status(200).send("registerd successfully")
            })
        }
    }
     catch(err){
        res.status(400).send(err.message)
     }
})

userrouter.post("/login",async(req,res)=>{
    try{
        let {email,password}=req.body
        let user=await UserModel.findOne({email})

        if(!user){
            res.status(400).send("register first")
        }
        else{
            bcrypt.compare(password,user.password,async(err, result)=> {

                if(result){
                    let token=jwt.sign({userid:user._id},process.env.secret)
                    res.send({"token":token})
                }
                else{
                    res.send(err.message)
                }

            });
        }

    }catch(err){
        res.send(err.message)
    }

})


userrouter.get("/logout",auth,async(req,res)=>{
    try{
     redisClient.set(token,1)
      res.send("blacklisted")
    }catch(err){
        res.send(err.message)
    }

})










module.exports={userrouter}