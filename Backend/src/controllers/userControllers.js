import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user already exists
    let check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        success: false,
        error: "User already exists with the provided Email ID",
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Initialize cart data
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Create new user
    const user = new User({
      name: username,
      email,
      password: hashedPassword, // Store hashed password
      cartData: cart,
    });
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret_ecom");

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in userRegister:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

//Login

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid Email or Password",
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid Email or Password",
      });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret_ecom", {
      expiresIn: "7d", // Token expiry (7 days)
    });
    console.log("token", token);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
