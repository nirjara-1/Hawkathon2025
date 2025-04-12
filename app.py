
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)
model = MobileNetV2(weights="imagenet")

@app.route("/classify", methods=["POST"])
def classify_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    image = Image.open(file).resize((224, 224))
    image_array = np.expand_dims(np.array(image), axis=0)
    image_array = preprocess_input(image_array)
    preds = model.predict(image_array)
    label = decode_predictions(preds, top=1)[0][0][1]
    confidence = float(decode_predictions(preds, top=1)[0][0][2])
    return jsonify({"label": label, "confidence": confidence})

if __name__ == "__main__":
    app.run(debug=True)
