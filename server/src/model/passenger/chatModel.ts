import { InferSchemaType, model, Schema, Types } from "mongoose";

const chatSchema = new Schema({
    sender: {
        id:{ type: Types.ObjectId , required: true} ,
        type: {type: String, required: true}
    },
    receiver:  {
        id:{ type: Types.ObjectId , required: true} ,
        type: {type: String, required: true}
    },
    message: { type: String, required: true },
    time: {
        type: Date,
        default: Date.now()
    }
},
    { timestamps: true }
)
type Chat = InferSchemaType<typeof chatSchema>;

export default model<Chat>('Chat', chatSchema);