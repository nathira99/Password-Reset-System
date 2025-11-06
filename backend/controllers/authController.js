const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// 🔹 Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ msg: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hash });
  await newUser.save();
  res.json({ msg: "Registered successfully" });
};

// 🔹 Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ msg: "Login successful", token });
};

// 🔹 Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Email not registered" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.tokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  await sendEmail(user.email, "Password Reset Link", `Click here to reset password: ${resetLink}`);
  res.json({ msg: "Reset link sent to your email" });
};

// 🔹 Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ msg: "Invalid or expired link" });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.tokenExpiry = undefined;
  await user.save();

  res.json({ msg: "Password updated successfully" });
};
