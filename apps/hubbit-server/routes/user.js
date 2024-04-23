const express = require("express");
const zod = require("zod");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();

const signupBody = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.cookie("token", token);
  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.cookie("token", token);
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

module.exports = router;
