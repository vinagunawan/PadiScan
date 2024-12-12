import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
import joblib
from flask import Flask, request, jsonify
from skimage.feature import hog

app = Flask(__name__)

# Fungsi untuk memproses dataset lokal
def load_local_dataset(dataset_path):
    if not os.path.exists(dataset_path):
        print(f"Dataset folder not found: {dataset_path}")
        return None
    
    features, labels = [], []
    
    for folder in os.listdir(dataset_path):
        folder_path = os.path.join(dataset_path, folder)
        if os.path.isdir(folder_path):
            print(f"Processing folder: {folder}")
            for file in os.listdir(folder_path):
                if file.endswith((".png", ".jpg", ".jpeg")):
                    image_path = os.path.join(folder_path, file)
                    image = cv2.imread(image_path)
                    if image is not None:
                        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Konversi ke grayscale
                        image = cv2.resize(image, (128, 128))  # Resize gambar
                        fd, _ = hog(image, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
                        features.append(fd)
                        labels.append(folder)  # Gunakan nama folder sebagai label

    # Jika tidak ada gambar yang valid
    if len(features) == 0 or len(labels) == 0:
        print("No valid images found.")
    else:
        print(f"Successfully loaded {len(features)} images.")

    features, labels = np.array(features), np.array(labels)
    return features, labels

# Fungsi untuk melatih model dan menyimpannya
def train_and_save_model(dataset_path, model_path):
    features, labels = load_local_dataset(dataset_path)
    if features is None or labels is None:
        print("Error: Dataset is empty or invalid.")
        return
    
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    
    clf = DecisionTreeClassifier()
    clf.fit(X_train, y_train)

    # Evaluasi model
    y_pred = clf.predict(X_test)
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Precision:", precision_score(y_test, y_pred, average='weighted'))
    print("Recall:", recall_score(y_test, y_pred, average='weighted'))
    print("F1 Score:", f1_score(y_test, y_pred, average='weighted'))

    # Pastikan folder untuk model ada
    os.makedirs(os.path.dirname(model_path), exist_ok=True)

    # Simpan model
    joblib.dump(clf, model_path)
    print("Model saved at:", model_path)

# Fungsi untuk prediksi gambar
def predict(features, model_path):
    model = joblib.load(model_path)
    return model.predict([features])[0]

# Fungsi untuk preprocessing gambar (resize dan ekstraksi fitur HOG)
def preprocess_image(image_file):
    image = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (128, 128))
    fd, _ = hog(image, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
    return fd

# Endpoint API untuk prediksi
@app.route('/predict', methods=['POST'])
def predict_api():
    try:
        image_file = request.files['image']
        features = preprocess_image(image_file)
        result = predict(features, 'static/model_decision_tree.pkl')
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    # Dataset dan model path
    dataset_path = "Citra Daun Padi"  # Pastikan folder dataset ada di lokasi yang benar
    model_path = 'static/model_decision_tree.pkl'
    
    # Latih dan simpan model
    train_and_save_model(dataset_path, model_path)
    
    # Jalankan server Flask
    app.run(debug=True)
