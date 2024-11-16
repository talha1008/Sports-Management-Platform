import clubsData from "../data/clubs.data.json" assert { type: 'json' };
import Membership from "../models/order.model.js";
import Payment from "../models/payment.model.js";

export const getClubs = (req, res) => {
    try {
        const data = clubsData.clubs;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getClubById = (req, res) => {
    try {
        const id = req.params.id;
        const data = clubsData.clubs.find(club => club.id === id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "No club such found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const getMyClubs = async (req, res) => {
    try {
        const userClubs = await Membership.findOne({ user: req.params.id });
        if (!userClubs) {
            return res.status(400).json({ error: "No orders found" });
        }

        const clubIds = userClubs.clubs;
        const clubs = await Payment.find({ _id: { $in: clubIds } });

        if (clubs) {
            res.status(200).json(clubs);
        } else {
            res.status(400).json({ error: "Error in Fetching orders" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}