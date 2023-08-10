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
import resHeadRoutes from "./routes/reshead.js";
import chatRoutes from "./routes/chats.js";
import reqRoutes from "./routes/requests.js";
import searchRoutes from "./routes/search.js";
import eventRoutes from "./routes/events.js";
import classRoutes from "./routes/classes.js";
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
<<<<<<< HEAD
    origin: ["https://cambuzz.netlify.app", "http://localhost:3000/"]
=======
    origin: ["https://cambuzz.netlify.app/", "http://localhost:3000/", "http://localhost:3001"], credentials:true
>>>>>>> 891a828c89ea96e18ddc6a521501bb5aa02036aa
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
const storageEvent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/events");
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
const eventUpload = multer({ storage: storageEvent });
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

app.post("/api/eventupload", eventUpload.single("file"), (req, res) => {
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
app.use("/api/reshead", resHeadRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/requests", reqRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/classes", classRoutes);

app.listen(8800, () => {
  console.log("Server Started...");
});
