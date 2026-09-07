import "dotenv/config";
import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";

const app = express();

const { v2 } = cloudinary;

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());

app.delete("/api/images", async (req, res) => {
  const { publicId } = req.body;

  console.log("Deleting:", publicId);

  try {
    const result = await v2.uploader.destroy(publicId);

    console.log("Cloudinary:", result);

    res.json(result);
  } catch (error) {
    console.error("Cloudinary error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
