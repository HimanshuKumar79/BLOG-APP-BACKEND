const express = require("express");
const route = express.Router();
const { getBlogs } = require("../controller/getBlogs");
const { createBlog } = require("../controller/createBlog");
const { updateBlog } = require("../controller/updateBlog");
const { deleteBlog } = require("../controller/deleteBlog");
const { register, login, deleteUser } = require("../auth/authantication");
const { getSingleBlog } = require("../controller/getSingleBlog");
const { likeController } = require("../controller/likeController");

route.get("/getBlogs", getBlogs);
route.get("/getSingleBlog/:id", getSingleBlog);
route.post("/createBlog", createBlog);
route.put("/updateBlog/:id", updateBlog);
route.delete("/deleteBlog/:id", deleteBlog);
route.delete("/deleteUser", deleteUser);
route.post("/register", register);
route.post("/login", login);
route.post("/like", likeController);

module.exports = route;
