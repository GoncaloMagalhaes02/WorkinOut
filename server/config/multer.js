import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import multer from 'multer';
import fs from 'fs';

// Caminho absoluto da pasta atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Garante que a pasta uploads existe
const uploadPath = join(__dirname, '../uploads');
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
  }
});

const upload = multer({ storage });

export default upload;
