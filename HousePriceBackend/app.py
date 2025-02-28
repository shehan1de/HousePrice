from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the model
with open('model/xgb_model.pkl', 'rb') as file:  # Ensure the path to your model is correct
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.get_json()
        print("Received Data:", data)  # For debugging: Print the data received
        
        input_data = np.array(data['input']).reshape(1, -1)
        print("Reshaped Input Data:", input_data)  # For debugging: Print reshaped data
        
        # Make prediction using the loaded model
        prediction = model.predict(input_data)
        
        # Return the prediction as a JSON response
        return jsonify({'prediction': float(prediction[0])})

    except Exception as e:
        # Print error and return error message to the client
        print("Error occurred:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
