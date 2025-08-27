const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = userModel.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ error: "Error generating token" });
        }
        res.cookie("token", token);
        res.status(200).json({ message: "Registration successful" });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error registering user", error: error.message });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          return res.status(500).json({ error: "Error generating token" });
        }
        res.cookie("token", token);
        res.status(200).json({ message: "Login successful" });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging in user", error: error.message });
  }
};

const LogoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

const getProfile = async (req, res) => {
  const userId = req.cookies.token
    ? jwt.verify(req.cookies.token, process.env.JWT_SECRET).userId
    : undefined;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user profile", error: error.message });
  }
};

module.exports = { RegisterUser, LoginUser, LogoutUser, getProfile };
