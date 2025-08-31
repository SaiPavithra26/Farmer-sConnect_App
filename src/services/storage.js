const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadBase64 = async (base64) => {
  const res = await cloudinary.uploader.upload(base64, { folder: 'farmconnect/products' });
  return res.secure_url;
};
