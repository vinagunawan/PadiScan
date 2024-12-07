from flask import Flask, request, jsonify
import joblib
import numpy as np
import cv2
from skimage.feature import hog

app = Flask(__name__)

# Load model
model = joblib.load('static/model_decision_tree.pkl')

def preprocess_image(image_file):
    # Proses gambar (resize dan ekstraksi fitur HOG)
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (128, 128))
    fd, _ = hog(image, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
    return fd

@app.route('/predict', methods=['POST'])
def predict_api():
    try:
        image_file = request.files['image']
        features = preprocess_image(image_file)
        result = model.predict([features])[0]
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
