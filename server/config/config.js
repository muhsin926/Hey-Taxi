import mongoose from "mongoose"

export default function (){
    mongoose.connect("mongodb://localhost:27017/hey-taxi",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection
    .on("connected", () => console.log("Database connected"))
    .on("error", (error) => console.log(error,"error"))
}