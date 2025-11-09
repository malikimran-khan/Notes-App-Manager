import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createNote, getUserNotes , updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Define upload directory path
const uploadDir = path.join(process.cwd(), "uploads");

// 🟢 Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'uploads' folder created automatically.");
}

// 🟢 Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🟢 Routes
router.post("/", protect, upload.single("image"), createNote);
router.get("/", protect, getUserNotes);
router.put("/:id", protect, upload.single("image"), updateNote);
router.delete("/:id", protect, deleteNote);

export default router;
