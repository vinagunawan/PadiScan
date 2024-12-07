import zipfile
import io
import cv2
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from skimage.feature import hog
import joblib
import kagglehub

def train_and_save_model(dataset_name, model_path):
    # Download dataset
    path = kagglehub.dataset_download("rahmi21/rice-datasets")
    print("Path to dataset files:", path)

    features, labels = [], []

    # Unzip dataset to memory
    with zipfile.ZipFile(f"{dataset_name.split('/')[-1]}.zip", 'r') as z:
        file_list = z.namelist()

        for file in file_list:
            if file.endswith((".png", ".jpg", ".jpeg")):
                with z.open(file) as image_file:
                    image_bytes = io.BytesIO(image_file.read())
                    image = cv2.imdecode(np.frombuffer(image_bytes.read(), np.uint8), cv2.IMREAD_GRAYSCALE)

                    if image is not None:
                        image = cv2.resize(image, (128, 128))
                        fd, _ = hog(image, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
                        features.append(fd)

                        label = file.split('/')[1]  # Assuming label is the parent folder name
                        labels.append(label)

    features, labels = np.array(features), np.array(labels)
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)
    clf = DecisionTreeClassifier()
    clf.fit(X_train, y_train)

    joblib.dump(clf, model_path)
    print("Model saved at:", model_path)

if __name__ == "__main__":
    dataset_name = "rahmi21/rice-datasets"
    model_path = '../static/model_decision_tree.pkl'
    train_and_save_model(dataset_name, model_path)
