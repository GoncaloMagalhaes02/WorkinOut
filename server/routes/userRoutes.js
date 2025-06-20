import { Router } from "express";
import { createUser, getUserProfile, listaUsers } from "../controllers/user.js";
import { loginUser } from "../controllers/user.js";
import { insertData } from "../controllers/user.js";
import { getData } from "../controllers/user.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./index.js";
import fs from "fs";
import { join } from "path";
import { verifyToken } from "../authMiddleware.js";
import { atualizarDados } from "../controllers/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadPath = join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const UserRoutes = Router();

UserRoutes.post("/register", upload.single("photo"), createUser);

UserRoutes.post("/login", loginUser);

UserRoutes.post("/insertdata/:user_id", insertData);

UserRoutes.get("/getdata/:user_id", getData);

UserRoutes.get("/listaUsers", listaUsers);

UserRoutes.get("/getUserProfile/me", verifyToken, getUserProfile);

UserRoutes.post("/atualizaUser", verifyToken, atualizarDados);

export default UserRoutes;
