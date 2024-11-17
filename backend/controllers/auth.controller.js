import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, mobileNo, role } = req.body;

        //Validators
        if (password.length < 6) {
            return res.status(400).json({ error: "Pasword should be atleast 6 characters long" });
        }
        if (name.length < 2) {
            return res.status(400).json({ error: "Name should be atleast 2 characters long" });
        }
        if (mobileNo.length != 10) {
            return res.status(400).json({ error: "Enter a valid Mobile No." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists. Try logging into your account or signup with another email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobileNo,
            role,
        });

        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobileNo: newUser.mobileNo,
                role: newUser.role
            });
        } else {
            return res.status(400).json({ error: "Invalid User Data" });
        }

    } catch (error) {
        console.log("Error in Signup controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Cannot find User" });
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            return res.status(400).json({ error: "Invalid Login Credentials" });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            role: user.role
        });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(200).json({ message: "Password updated successfully." });
        } else {
            res.status(400).json({ error: "Couldn't update the password" });
        }
    } catch (error) {
        console.log("Error in updating password:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};