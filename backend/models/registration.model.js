import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            default: []
        }
    ]
}, { timestamps: true });

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;