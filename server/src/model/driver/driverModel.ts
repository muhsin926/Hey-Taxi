import mongoose, { Document, Schema } from 'mongoose';

interface Driver extends Document {
  name: string;
  email: string;
  password:string;
  mobile:number;
  profile: string;
  license: string;
  available: boolean;
  vehicle: mongoose.Types.ObjectId;
}

const driverSchema = new Schema(
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
    license: {type: String},
    vehicle: [{
        type: mongoose.Types.ObjectId,
        ref: 'Vehicle'
    }],
    available: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export default mongoose.model<Driver>("Driver", driverSchema);