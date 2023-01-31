import { InferSchemaType, Schema, model } from "mongoose";

const passengerSchema = new Schema(
  {
    name: {
      type: String,
      required: [ true, "Please provide a name" ]
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email" ],
      unique: [ true, "Email already exist" ]
    },
    password: {
      type: String,
      required: [ true, "Please provide a strong password" ]
    },
    mobile: { type: Number },
    profile: { type: String },
  },
  { timestamps: true }
);

type pass = InferSchemaType<typeof passengerSchema>;

export default model<pass>("passenger", passengerSchema);
