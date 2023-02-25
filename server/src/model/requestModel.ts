import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    pickupLocation: {
      type: String,
      required: [ true, "" ]
    },
    destination: {
      type: String,
      required: [true, "Please provide a destination" ],
    },
    sender: {
      type: mongoose.Types.ObjectId,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
    },
    accepted: {type: Boolean, default: false}
  },
  { timestamps: true }
);

type req = InferSchemaType<typeof requestSchema>;

export default model<req>("ride_requests", requestSchema);