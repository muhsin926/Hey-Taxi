import mongoose from "mongoose"

const Schema = mongoose.Schema

const passengerSchema = Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
   
})

export default mongoose.model('passenger',passengerSchema)