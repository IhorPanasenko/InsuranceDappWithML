from flask import Flask, request, jsonify
from flask_cors import CORS

from linearPrediction.insurance_linear_prediction import predict_payment

app = Flask(__name__)
CORS(app)

@app.route('/predict_payment', methods=['POST'])
def predict_insurance_payment():
    data = request.get_json()
    age = data.get('age')
    insurance_category = data.get('insuranceCategory')

    predicted_payment = predict_payment(age, insurance_category)

    return jsonify({'predicted_payment': predicted_payment})


if __name__ == '__main__':
    app.run()
