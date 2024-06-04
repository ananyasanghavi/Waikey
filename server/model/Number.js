import mongoose from "mongoose";

const NumberSchema = new mongoose.Schema({
    numberPlate: String,
    phoneNumber: Number
});

export default mongoose.model("Number", NumberSchema);
