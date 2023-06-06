const jwt = require("jsonwebtoken");
const UserSchema = require("../model/userSchema");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(email && name && password)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }
    const validUser = await UserSchema.findOne({ email });
    if (validUser) {
      return res.status(403).json({
        success: false,
        message: "Email already in use",
      });
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    await UserSchema.create({ name, email, password: hashPassword });
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }
    const validUser = await UserSchema.findOne({ email });
    if (!validUser) {
      return res.status(401).json({
        success: false,
        message: "User does not exists",
      });
    }

    const passwordCheck = await bcryptjs.compare(password, validUser.password);
    if (!passwordCheck) {
      return res.status(402).send({
        success: false,
        message: "Invalid password",
      });
    }
    try {
      const payload = {
        name: validUser.name,
        email: validUser.email,
        id: validUser._id,
      };
      const options = {
        expires: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
        httpOnly: true, 
        secure: true, 
        sameSite: "none" 
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: `Welcome back ${validUser.name}`,
          token,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Id is required",
      });
    }
    const User = await UserSchema.findById({ _id: id });
    if (!User) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }
    const deletedUser = await UserSchema.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: false,
      message: "User deleted",
    });
  } catch (error) {}
};
