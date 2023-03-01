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
    schedule: { 
      date: {type: String},
      time: {type: String},
      scheduled: { type: Boolean, default: false}
    },
    vehilceId: { type: mongoose.Types.ObjectId, ref: 'Vehicle' },
    latitude : [],
    longitude : [],
    finished: {type: Boolean,default: false},
    fare: {type: Number},
    paymentId: {type: String}
  },
  { timestamps: true }
);

type req = InferSchemaType<typeof requestSchema>;

export default model<req>("ride_requests", requestSchema);
