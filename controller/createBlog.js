const BlogSchema = require("../model/blogSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!(title && description && image)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }
    const loginUser = jwt.verify(token, process.env.SECRET_KEY);
    if (!loginUser) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    const Blog = await BlogSchema.create({
      title,
      description,
      image,
      author: await loginUser.name,
      author_id: await loginUser.id,
    });
    res.status(200).json({
      success: true,
      message: "Blog created successfully",
      Blog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
