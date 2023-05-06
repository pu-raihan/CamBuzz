import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import relationRoutes from "./routes/relations.js";
import postRoutes from "./routes/posts.js";
import storyRoutes from "./routes/stories.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import facultyRoutes from "./routes/faculty.js";
import resourceRoutes from "./routes/resources.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"]
  })
);

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const storageStory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/stories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const storageProf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/cover");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const profUpload = multer({ storage: storageProf });
const coverUpload = multer({ storage: storageCover });
const storyUpload = multer({ storage: storageStory });
const upload = multer({ storage: storage });

app.post("/api/profupload", profUpload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/coverupload", coverUpload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/storyupload", storyUpload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/relations", relationRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/resources", resourceRoutes);

app.listen(8800, () => {
  console.log("Server Started...");
});
