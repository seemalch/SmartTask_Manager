import bcrypt from "bcryptjs";
    import crypto from "crypto";
    import { generateTokenAndSetCookie } from "../utility/generateTokenAndSetCookie.js";
    import { User } from "../models/userModel.js";
    import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";

    export const signup = async (req, res) => {
      const { email, password, name } = req.body;
      try {
        if (!email || !password || !name) throw new Error("All fields are required");
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) return res.status(400).json({ success: false, message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({ email, password: hashedPassword, name, verificationToken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 });
        await user.save();
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({ success: true, message: "User created successfully", user: { ...user._doc, password: undefined }, email });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    };

    export const verifyEmail = async (req, res) => {
      const { code, email } = req.body;
      try {
        const user = await User.findOne({ email, verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        user.isVerified = true; user.verificationToken = undefined; user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(email, user.name);
        res.status(200).json({ success: true, message: "Email verified successfully", user: { ...user._doc, password: undefined } });
      } catch (error) {
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
      }
    };

    export const login = async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" });
        if (!user.isVerified) return res.status(403).json({ success: false, message: "Email not verified" });
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({ success: true, message: "Logged in successfully", user: { ...user._doc, password: undefined } });
      } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
      }
    };

    export const logout = async (req, res) => {
      res.clearCookie("token");
      res.status(200).json({ success: true, message: "Logged out successfully" });
    };

    export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};