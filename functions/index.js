const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");
const cors = require("cors")({ origin: true });

const client = new vision.ImageAnnotatorClient();

exports.analyzeImage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { imageUrl } = req.body;

    try {
      const [result] = await client.labelDetection(imageUrl);
      const labels = result.labelAnnotations;
      res.json({ labels });
    } catch (error) {
      console.error("Vision API error:", error);
      res.status(500).send("Failed to analyze image");
    }
  });
});