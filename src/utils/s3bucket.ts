/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {sha1} from "./encryptions";
import * as process from "process";
import mime from "mime-types";

// Needed to get __dirname in ES module
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const region = `${process.env.S3_REGION}`;
const endpoint = `${process.env.S3_BUCKET_HOST}`;
const bucketId = `${process.env.S3_BUCKET_ID}`; //main folder for auth
const bucketName = `${process.env.S3_BUCKET_NAME}`;

// Configure your AWS S3 client
const s3 = new S3Client({
    region: region,
    endpoint: endpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: `${process.env.S3_ACCESS_KEY_ID}`,
        secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY}`,
    },
});

// Upload function
const uploadToS3 = async () => {
    const filePath = path.join(__dirname, "pic.png");
    const fileStream = fs.createReadStream(filePath);

    // Extract file extension and lookup MIME type
    const fileExtension = path.extname(filePath); // e.g., '.jpg'
    const contentType = mime.lookup(fileExtension) || 'application/octet-stream';

    //hash the names for unfriendly cache
    const key = "generals/" + new Date().getMonth() + "/"
    const keyFile = sha1(new Date().toISOString());
    const fullKey = path.join(key, keyFile);

    const uploadParams = {
        Bucket: bucketName,
        Key: fullKey,
        Body: fileStream,
        ACL: "public-read",
        ContentType: "image/jpeg",
    };

    try {
        // @ts-ignore
        const result = await s3.send(new PutObjectCommand(uploadParams));

        const publicUrl = `${endpoint}/${bucketId}:${bucketName}/${fullKey}`;

        //console.log("File uploaded successfully. Public URL:", publicUrl);

        console.log("✅ Upload successful:", result);

        return publicUrl;

    } catch (err) {
        console.error("❌ Upload failed:", err);
        return false
    }
};
