import cloudinary from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import os from "os";

cloudinary.v2.config(/* {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
} */);
export const config = {
  api: { bodyParser: false },
};

function parseForm(req) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: os.tmpdir(),
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  if (!process.env.CLOUDINARY_URL) {
    return res
      .status(500)
      .json({ message: "Server misconfigured: missing CLOUDINARY_URL" });
  }

  try {
    const { files } = await parseForm(req);

    let file = files.file ?? files.image;
    if (Array.isArray(file)) file = file[0];

    if (!file) {
      return res
        .status(400)
        .json({ message: "No file uploaded. Expected form field 'file'." });
    }

    const filepath = file.filepath || file.path || file.tempFilePath;

    if (!filepath) {
      console.error("Parsed file object has no path:", file);
      return res.status(400).json({
        message:
          "Upload failed: parsed file has no path. Check formidable version and field name.",
      });
    }

    const result = await cloudinary.v2.uploader.upload(filepath, {
      folder: "emu", // optional
    });

    try {
      fs.unlink(filepath, () => {});
    } catch {}

    return res.status(200).json({
      secure_url: result.secure_url,
      url: result.url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      message: "Upload failed",
      error: err?.message || String(err),
    });
  }
}
