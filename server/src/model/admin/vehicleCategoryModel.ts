import mongoose, { Document, Schema } from "mongoose";

interface VehicleCategory extends Document {
  id: string;
  name: string;
  capacity: number;
  discription: string;
  rate: number;
  image: string;
  VehicleId: string;
}

const categorySchema = new Schema(
    {
        name: {type: String},
        capacity: {type: Number},
        discription: {type: String},
        rate: {type: Number},
        image: {type: String},
        vehicleId: [{
            type: mongoose.Types.ObjectId,
            ref: 'vehicle'
        }],
        
    },
    { timestamps: true }
);


export default mongoose.model<VehicleCategory>("Vehicle_category", categorySchema);