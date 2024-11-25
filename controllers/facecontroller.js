import { generateTensorFromBuffer, analyzeFaceImage } from "../models/facemodel.js";

export async function analyzeImage(req, res) {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    // Decode Base64 image
    const imageBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageBase64, "base64");

    const tensor = await generateTensorFromBuffer(imageBuffer);
    const results = await analyzeFaceImage(tensor);
    console.log(results);
    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ success: false, message: "Error processing image" });
  }
}
