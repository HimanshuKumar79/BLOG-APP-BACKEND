const BlogSchema = require("../model/blogSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.updateBlog = async (req, res) => {
  try {
    const { image, title, description } = req.body;
    const { id } = req.params;
    if (!(title && description && id && image)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    const loginUser = jwt.verify(token, process.env.SECRET_KEY);
    if (!loginUser) {
      return res.status(402).json({
        success: false,
        message: "User not authenticated",
      });
    }
    const Blog = await BlogSchema.findById({ _id: id });
    if (!Blog) {
      return res.status(403).json({
        success: false,
        message: "This blog does not exist",
      });
    }
    if (loginUser.id !== Blog.author_id) {
      return res.status(404).json({
        success: false,
        message: "You are not allowed to update this blog",
      });
    }
    const updatedBlog = await BlogSchema.findByIdAndUpdate(
      { _id: id },
      { title, description, image, updated_AT: Date.now() },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
