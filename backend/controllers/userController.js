import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const login = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.staus(404);
    throw new Error("User not found.");
  }
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    res.status(404);
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign(
    {
      _id: existingUser._id,
    },
    process.env.jwtPrivateKey,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    token,
  });
};

export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

export const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.staus(400);
    throw new Error("User already registered.");
  }
  user = new User({
    ...req.body,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.json(user);

  const token = jwt.sign(
    {
      _id: existingUser._id,
    },
    process.env.jwtPrivateKey,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    _id: existingUser._id,

    name: existingUser.name,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    token,
  });
};
