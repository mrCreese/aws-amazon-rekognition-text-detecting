import express from "express";
import fs from "fs";
import cors from "cors";
import http from "http";
import https from "https";
import multer from "multer";
import { err, wrapper } from "../utils/utils.js";
import { textDetection, uploadFile } from "../express/s3.js";
import dotenv from "dotenv";

dotenv.config();

const maxSize = 5;

const protocol = process.env.PROTOCOL || "http";
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: maxSize * 1024 * 1024 }, // Limite di dimensione del file: 5 megabyte;
});

let server = undefined; //? server express

//? http || https
if (protocol !== "" && protocol.includes("https")) {
  const CERTIFICATE = fs.readFileSync(process.env.CERTIFICATE_PATH);
  const PRIVATE_KEY = fs.readFileSync(process.env.PRIVATE_KEY_PATH);
  server = https.createServer({ key: PRIVATE_KEY, cert: CERTIFICATE }, app);
} else {
  server = http.createServer(app);
}
/* app.post("/upload", upload.single("file"), async (req, res) => {
  const r = await uploadFile(req.file);
  if (r?.success) res.status(200).json(r);
  else res.status(400).json(r);
  fs.unlinkSync(req.file.path);
}); */

//? Rotta per l'upload del file
app.post("/text-detection", upload.single("file"), async (req, res) => {
  const r = await uploadFile(req.file);
  if (r?.success) {
    res.status(200).json(r);
  } else res.status(400).json(r);
  fs.unlinkSync(req.file.path);
});

//? Middleware per gestire gli errori di dimensione del file di Multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    //? Se l'errore è causato da Multer, verifica se è dovuto a un file troppo grande
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json(
          err(`Il file supera la dimensione massima consentita (${maxSize}MB).`)
        );
    }
  }
  //? Se l'errore non è di Multer o non è dovuto a un file troppo grande, passalo al gestore di errori successivo
  next(error);
});
export { server, protocol };
