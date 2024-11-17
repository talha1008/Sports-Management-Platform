import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            required: true,
        },
        payment_intent_id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        image_url: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        club: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        institute: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        customer_name: {
            type: String,
            required: true,
        },
        customer_email: {
            type: String,
            required: true,
        },
        customer_mobile: {
            type: String,
            required: true,
            min: 10,
            max: 10,
        },
        team_name: {
            type: String,
            required: true,
        },
        team_lead_name: {
            type: String,
            required: true,
        },
        team_lead_phone: {
            type: String,
            required: true,
            min: 10,
            max: 10,
        },
        lead_institute: {
            type: String,
            required: true,
        },
        members: [
            {
                name: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: String,
                    required: true,
                    min: 10,
                    max: 10,
                }
            }
        ],
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;