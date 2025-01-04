require("dotenv").config();

const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("watchList", {
    Id: 1,
    title: 1,
    poster_path: 1,
    mediaType: 1,
    addedAt: 1,
  });

  res.status(200).json(users.map((user) => user.toJSON()));
});

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  if (!password || password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  // Validate username length
  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, passwordHashed, name });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = userRouter;
