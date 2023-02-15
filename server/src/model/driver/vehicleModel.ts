import mongoose, { Document, Schema } from "mongoose";

interface Vehicle extends Document {
  id: string;
  model: string;
  year: number;
  license: string;
  RC: string;
  reg_no: string;
  capacity: number;
  insurence: string;
  driverId: string;
}

const vehicleSchema = new Schema(
    {
        model: {type: String},
        year: {type: Number},
        license: {type: String},
        RC: {type: String},
        reg_no: {type: String},
        capacity: {type: Number},
        insurence: {type: String},
        driverId: [{
            type: mongoose.Types.ObjectId,
            ref: 'driver'
        }],
        
    },
    { timestamps: true }
);


export default mongoose.model<Vehicle>("Vehicle", vehicleSchema);