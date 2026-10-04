import "dotenv/config";
import express from "express";
import cors from "cors";
import ImageKit from "@imagekit/nodejs";

const app = express();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://chizkodem.github.io" , "https://chizkodem.xyz"],
  }),
);

app.use(express.json());

// ImageKit authentication
app.get("/api/imagekit-auth", (req, res) => {
  try {
    const { token, expire, signature } =
      imagekit.helper.getAuthenticationParameters();

    res.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit auth error:", error);

    res.status(500).json({
      error: "Failed to generate ImageKit authentication",
    });
  }
});

// Delete ImageKit image
app.delete("/api/imagekit/images", async (req, res) => {
  const { fileId } = req.body;

  console.log("Deleting ImageKit image:", fileId);

  try {
    await imagekit.files.delete(fileId);

    console.log("ImageKit: deleted");

    res.json({
      result: "ok",
    });
  } catch (error) {
    console.error("ImageKit error:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
