import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import { err, succ } from "../utils/utils.js";

dotenv.config();

const bucketName = "AWS_BUCKET_NAME";
const bucketRegion = "AWS_BUCKET_REGION";
const accessKey = "AWS_ACCESS_KEY";
const secretAccessKey = "AWS_SECRET_ACCESS_KEY";

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export async function uploadFile(file) {
  const uploadsParams = {
    Bucket: bucketName,
    Body: fs.createReadStream(file.path), // Leggi direttamente dal file sul disco
    Key: file.originalname,
    ContentType: file.mimetype, // Utilizza direttamente il tipo MIME del file
  };

  const command = new PutObjectCommand(uploadsParams);

  try {
    const response = await s3.send(command);
    if (response?.["$metadata"]?.httpStatusCode == 200) {
      const resDetection = await textDetection(file.originalname);
      return resDetection; // Ritorna la risposta per eventuali elaborazioni aggiuntive
    }
    return err("Non è stato possibile caricare file");
  } catch (error) {
    console.error("Errore durante l'upload:", error);
    return err(error);
  }
}

export async function textDetection(fileName) {
  const config = new AWS.Config({
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  });
  config.update({ region: bucketRegion });

  const params = {
    Image: {
      S3Object: {
        Bucket: bucketName,
        Name: fileName,
      },
    },
  };

  const client = new AWS.Rekognition(config);

  try {
    const response = await new Promise((resolve, reject) => {
      client.detectText(params, function (err, response) {
        if (err) {
          reject(err); // Rejected Promise in caso di errore
        } else {
          resolve(response); // Risolvi la Promise con la risposta
        }
      });
    });
    return succ(response.TextDetections); // Ritorna TextDetections
  } catch (error) {
    console.error("Error:", error);
    return err(error);
  }
}
