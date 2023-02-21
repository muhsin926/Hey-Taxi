import { v2 as cloudinary } from "cloudinary";
import env from "../utility/validateEnv";

interface UploadApiOptions {
  resource_type?: "auto" | "image" | "video" | "raw";
  overwrite?: boolean;
  invalidate?: boolean;
}

const cloud_name = env.CLOUD_NAME;
const api_key = env.API_KEY;
const api_secret = env.API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const opts: UploadApiOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export default (image: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      } else if (error) {
        console.log(error.message);
        return reject({ message: error.message });
      }
    });
  });
};
