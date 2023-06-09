import express from "express";
import { User, generateJwtToken } from "../Models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// signup

router.post("/signup", async (req, res) => {
  try {
    // check for already existing user
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // logic for create new user

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      userType: req.body.userType,
    }).save();

    const token = generateJwtToken(user._id);
    res
      .status(201)
      .json({ message: "user logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Router

router.post("/login", async (req, res) => {
  try {
    // check the user database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // password Validation

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = generateJwtToken(user._id);
    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const userRouter = router;
