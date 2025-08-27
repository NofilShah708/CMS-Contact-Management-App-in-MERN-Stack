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
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        "http://localhost:5173", // Development
        "https://contacthubweb.netlify.app", // Production - old domain
        "https://cms-contact-management-app-in-mern-stack.onrender.com", // Production - new domain
        "https://cms-contact-management.onrender.com" // Backend itself
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
