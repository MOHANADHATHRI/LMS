const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const Course = require("./models/Course");

const app = express();

// ✅ Middleware
app.use(cors()); // simplified
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Debug log (VERY useful)
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// ✅ Home route
app.get("/", (req, res) => {
  res.send("LMS Backend with MongoDB is running");
});

// ✅ GET all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ADD new course
app.post("/api/courses", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Course name is required" });
    }

    const newCourse = new Course({ name });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error adding course:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
