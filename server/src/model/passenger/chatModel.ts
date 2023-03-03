import { InferSchemaType, model, Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
    //   required: true,
    },
    message: {
      type: String,
      required: true,
    },
    senderType: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
type Chat = InferSchemaType<typeof chatSchema>;

export default model<Chat>("Chat", chatSchema);
