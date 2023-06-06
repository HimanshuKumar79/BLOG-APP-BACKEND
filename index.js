const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const routes = require("./routes/route");
const cors=require("cors")
const PORT = process.env.PORT || 3000;
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials:true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("", routes);
app.listen(PORT, () => {
  console.log("Server listening on PORT ", PORT);
});
connectDB();
