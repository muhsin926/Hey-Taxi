import {InferSchemaType, Schema, model} from "mongoose";

const passengerSchema = new Schema({
    name:{ type:String, required:true },
    email: {type:String, required:true},
    password: { type:String, required: true}
},{timestamps : true });

type pass = InferSchemaType<typeof passengerSchema>;

export default model<pass>("passenger", passengerSchema)
