from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

model = joblib.load('xgboost_final_model.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    features = [
        data['MedInc'], 
        data['HouseAge'], 
        data['AveRooms'], 
        data['AveBedrms'], 
        data['Population'], 
        data['AveOccup'], 
        data['Latitude'], 
        data['Longitude']
    ]

    features_array = np.array(features).reshape(1, -1)

    scaled_features = scaler.transform(features_array)
    
    prediction = model.predict(scaled_features)
    
    return jsonify({'predicted_price': round(float(prediction[0]), 2)})

if __name__ == '__main__':
    app.run(debug=True)
