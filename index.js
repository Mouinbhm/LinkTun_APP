const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");

const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = process.env.DATABASE.replace(
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection secured!!!");
  })
  .catch((err) => {
    console.error("DB Connection error:", err);
  });

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server" });
});

app.listen(process.env.PORT, () => {
  console.log("listening...");
});
