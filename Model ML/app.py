import os
import cv2
import numpy as np
import joblib
from flask import Flask, request, jsonify
from skimage.feature import hog

app = Flask(__name__)

def preprocess_image(image_file):
    image = cv2.imdecode(np.frombuffer(image_file, np.uint8), -1)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    resized_image = cv2.resize(gray_image, (128, 128))  # Resize to match model input
    features, _ = hog(resized_image, block_norm='L2-Hys', pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
    return features.reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'message': 'No image file provided'}), 400
    
    image_file = request.files['image'].read()
    features = preprocess_image(image_file)
    
    # Ganti path file model menjadi model_decision_tree.pkl
    model = joblib.load('static/model_decision_tree.pkl')  # Load model Decision Tree
    prediction = model.predict(features)

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
