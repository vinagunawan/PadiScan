from flask import Flask, request, jsonify
from predict_model import predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_api():
    try:
        data = request.get_json()
        features = data['features']
        result = predict(features, '../static/model_decision_tree.pkl')
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)