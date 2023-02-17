import mongoose, { Document, Schema } from "mongoose";

interface Vehicle extends Document {
  id: string;
  model: string;
  year: number;
  RC: string;
  reg_no: string;
  category: string;
  insurence: string;
  driverId: string;
}

const vehicleSchema = new Schema(
    {
        model: {type: String},
        year: {type: Number},
        RC: {type: String},
        reg_no: {type: String},
        category: {type: String},
        insurence: {type: String},
        driverId: [{
            type: mongoose.Types.ObjectId,
            ref: 'driver'
        }],
        
    },
    { timestamps: true }
);


export default mongoose.model<Vehicle>("Vehicle", vehicleSchema);