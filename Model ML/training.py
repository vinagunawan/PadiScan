import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib
from skimage.feature import hog

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

    # Simpan model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(clf, model_path)
    print("Model saved at:", model_path)

# Latih dan simpan model
dataset_path = "Citra Daun Padi"  # Pastikan folder dataset ada di lokasi yang benar
model_path = 'static/model_decision_tree.pkl'
train_and_save_model(dataset_path, model_path)
