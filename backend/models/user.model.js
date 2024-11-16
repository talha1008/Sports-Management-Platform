import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        max: 10,
        min: 10,
        required: true
    },
    role: {
        type: String,
        enum: ["Coach", "Member", "Parent", "Administrator", "Participant"],
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;