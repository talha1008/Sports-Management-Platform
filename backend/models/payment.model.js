import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            required: true
        },
        payment_intent_id: {
            type: String,
            required: true
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
        sport: {
            type: String,
            required: true
        },
        institute: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        customer_name: {
            type: String,
            required: true
        },
        customer_email: {
            type: String,
            required: true
        },
        customer_mobile: {
            type: String,
            min: 10,
            max: 10,
            required: true
        }
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;