import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDDINARY_API_KEY,
  api_secret: process.env.CLOUDDINARY_SECRET_KEY,
});

const uploadImgCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImg = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "kurorumi" }, (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      })
      .end(buffer);
  });

  return uploadImg;
};

export default uploadImgCloudinary;
