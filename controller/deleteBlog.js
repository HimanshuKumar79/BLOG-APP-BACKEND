const BlogSchema = require("../model/blogSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "user is not authorized",
      });
    }
    const Blog = await BlogSchema.findById({ _id: id });
    if (!Blog) {
      return res.status(402).json({
        success: false,
        message: "This blog is not available",
      });
    }

    if (decoded.id !== Blog.author_id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog",
      });
    }
    const deletedBlog = await BlogSchema.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    res.status(200).json({
      success: false,
      message: "This blog has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
