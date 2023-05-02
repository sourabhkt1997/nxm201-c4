let mongoose=require("mongoose")

let userSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
},{
    versionKey:false
})

UserModel=mongoose.model("userdata",userSchema)

module.exports={UserModel}