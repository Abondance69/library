const User = require("../models/User");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.createUser = async (req, res) => {
  const { firstname, lastname, email, password, role, subscription } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      subscription,
    });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: `Server error: ${error.message}` });
  }
};
// DTO
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ msg: "Authentication failed" });
    }

    // vérifier le mdp
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwtToken.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: true,
    });

    res.status(200).json({ msg: "User successfully logged in" });
  } catch (error) {
    res.status(500).json({ msg: `Server error : ${error}` });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1, httpOnly: true });
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    res.status(500).json({ msg: `Server error : ${error}` });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req.user.userId) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const user = await User.findById({_id: req.user.userId}).select('-password').select('-__v');;

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: `Server error : ${error}` });
  }
};
