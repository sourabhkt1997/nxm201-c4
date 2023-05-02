let express=require("express")

let app=express()
app.use(express.json())
require("dotenv").config()
let {connection}=require("./db")
const { userrouter } = require("./router/userrouter")
let {locationroute}=require("./router/locationroute")

let {authlocation}=require("./middlewares/authonLocation")


app.use("/user",userrouter)

app.use(authlocation)
app.use("/location",locationroute)




app.listen(process.env.port,async()=>{

    try{
        await connection
        console.log("connected to port"+process.env.port)
    }
    catch(err){
        console.log(err.message)
    }
})



