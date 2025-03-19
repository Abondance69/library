const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getUser,
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/user", authMiddleware(), getUser);

module.exports = router;
