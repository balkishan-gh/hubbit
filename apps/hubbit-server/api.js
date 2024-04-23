require("dotenv").config();
// Itis typically used in Node.js applications to load environment variables from a .env file into process.env.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const rootRouter = require("./routes/api");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// To support JSON body in POST requests

app.use("/api", rootRouter);
// It will route all your requests from /api/v1 to rootRouter

mongoose
  .connect(
    "mongodb+srv://balkishan23dec:pUrzjcwL4mTsqqpV@cluster0.jg1qd9l.mongodb.net/hubbitDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
