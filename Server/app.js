const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.config");
const cors = require("cors");
//Router Imports
const authRouter = require("./router/authRouter");
const contactRouter = require("./router/contactRouter");
const cookieParser = require("cookie-parser");

// Connect to MongoDB
connectDB();

// Uses
app.use(
  cors({
    origin: "http://localhost:5173", // <-- your frontend URL
    credentials: true, // <-- allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

//Router Use
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
