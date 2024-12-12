import os
import cv2
import numpy as np
import joblib
from flask import Flask, request, jsonify
from skimage.feature import hog

app = Flask(__name__)

# Fungsi untuk memproses gambar (resize dan ekstraksi fitur HOG)
def preprocess_image(image_file):
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (128, 128))
    fd, _ = hog(image, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
    return fd

# Fungsi untuk memuat model yang sudah disimpan
def load_model(model_path):
    return joblib.load(model_path)

# Fungsi untuk prediksi gambar
def predict(features, model):
    return model.predict([features])[0]

# Endpoint API untuk prediksi
@app.route('/predict', methods=['POST'])
def predict_api():
    try:
        # Memuat model yang sudah dilatih
        model_path = 'static/model_decision_tree.pkl'
        model = load_model(model_path)

        # Memproses gambar yang diunggah
        image_file = request.files['image']
        features = preprocess_image(image_file)

        # Melakukan prediksi
        result = predict(features, model)

        # Mengirimkan hasil prediksi sebagai respon JSON
        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    # Jalankan server Flask
    app.run(debug=True)
