from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load Model (Use 'yolov5s' for speed, or your custom trained best.pt)
# For hackathon, loading from torch.hub is fastest if you haven't trained yet
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    # Inference
    results = model(img)
    
    # Parse results (Simplified)
    df = results.pandas().xyxy[0]
    # Check if plastic/bottle exists in detection
    detected = df['name'].tolist()
    
    response = {
        "detected_objects": detected,
        "is_recyclable": "bottle" in detected or "cup" in detected, # Simple logic
        "message": "Plastic Detected! +10 Points" if "bottle" in detected else "Waste Detected"
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5001, debug=True)