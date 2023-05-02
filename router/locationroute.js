let express=require("express")

let axios=require("axios")

let locationroute=express.Router()
let redis=require("ioredis")

const configuation={
    host: "redis-19106.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port:19106,
    username:"default",
    password:process.env.redispass
}

let redisClient=new redis(configuation)


locationroute.get("/:ip",async(req,res)=>{
      try{
      let {ip}=req.params
    
      let city=await redisClient.get(ip)
      console.log(city,"r")
      if(city){
        res.send({"city":city})
      }
      else{

        axios.get(`https://ipapi.co/${ip}/json/`)
        .then(function (response) {
            redisClient.set(ip,response.data.city,"EX",1000*60*6)
            res.send({"city":response.data.city})
          })
          .catch(function (error) {
            
            console.log(error);
          })

        

      }

        

      }
      catch(err){
        res.send(err.message)
      }
})


module.exports={locationroute}