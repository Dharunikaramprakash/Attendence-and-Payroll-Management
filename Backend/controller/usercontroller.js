import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "User not found or wrong role" });
    }

    // Check password
    const match = await bcrypt.compare(password.toString(), user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, "jwt-token", { expiresIn: "1d" });

    // Send token & name to frontend
    res.json({
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
