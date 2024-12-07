import joblib

def predict(features, model_path):
    model = joblib.load(model_path)
    return model.predict([features])[0]
