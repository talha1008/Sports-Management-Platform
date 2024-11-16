import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clubs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: []
        }
    ]
}, { timestamps: true });

const Membership = mongoose.model("Membership", MembershipSchema);

export default Membership;