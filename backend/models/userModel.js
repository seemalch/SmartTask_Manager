import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
      verificationToken: { type: String },
      verificationTokenExpiresAt: { type: Date },
      resetPasswordToken: { type: String },
      resetPasswordExpiresAt: { type: Date },
      lastLogin: { type: Date },
    });

export const User = mongoose.model("User", userSchema);