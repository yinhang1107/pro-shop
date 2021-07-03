import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const login = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(404);
    throw new Error("Invalid email or password.");
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
      name: existingUser.name,
      isAdmin: existingUser.isAdmin,
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
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

export const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400);
    throw new Error("User already registered.");
  }
  user = new User({
    ...req.body,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.jwtPrivateKey,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
};

export const updateUserProfile = async (req, res) => {
  let { name, email, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  user.password = password || user.password;

  const updatedUser = await user.save();

  const token = jwt.sign(
    {
      _id: updatedUser._id,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
    },
    process.env.jwtPrivateKey,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    token,
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json("User removed.");
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  let { name, email, isAdmin } = req.body;

  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin;

  await user.save();

  res.status(200).json(user);
};
