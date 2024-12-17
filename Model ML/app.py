import os
import cv2
import numpy as np
import joblib
from flask import Flask, request, jsonify
from skimage.feature import hog
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Set maximum file size (optional, for large images)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Maksimal 16 MB

# Load the pre-trained model
model = joblib.load('static/model_decision_tree.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        # Lakukan prediksi pada file
        # log path atau nama file yang diterima
        print(f"File uploaded: {file.filename}")    
    try:
        # Read and process the image
        image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        
        if image is None:
            logging.error('Failed to decode image')
            return jsonify({'message': 'Invalid image file'}), 400

        # Convert image to grayscale
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Resize the image to match model input size (128x128)
        resized_image = cv2.resize(gray_image, (128, 128))

        # Extract HOG features
        features, _ = hog(resized_image, block_norm='L2-Hys', pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)

        # Make prediction
        prediction = model.predict(features.reshape(1, -1))[0]

        logging.info(f"Prediction: {prediction}")
        
        return jsonify({'prediction': prediction})

    except Exception as e:
        logging.error(f"Error processing image: {str(e)}")
        return jsonify({'message': 'Error processing the image'}), 500

if __name__ == '__main__':
    # Run the Flask application on host 0.0.0.0 and port 5002
    app.run(debug=True, host='0.0.0.0', port=5002)
