import mongoose, { InferSchemaType, Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    pickupLocation: {
      type: String,
      required: [true, ""],
    },
    destination: {
      type: String,
      required: [true, "Please provide a destination"],
    },
    sender: { type: mongoose.Types.ObjectId, ref: 'passenger' },
    receiver: { type: mongoose.Types.ObjectId, ref: 'Driver' },
    accepted: { type: Boolean, default: false },
    schedule: { type: String, default: "Ride now"},
    latitude : [],
    longitude : [],
    finished: {type: Boolean,default: false},
  },
  { timestamps: true }
);

type req = InferSchemaType<typeof requestSchema>;

export default model<req>("ride_requests", requestSchema);
