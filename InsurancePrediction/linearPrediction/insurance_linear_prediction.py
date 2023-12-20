import json
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder

with open('./static/user_data.json') as f:
    data = json.load(f)

features = [(entry['age'], entry['insuranceCategory']) for entry in data]
target = [entry['wasPayed'] for entry in data]

label_encoder = LabelEncoder()
features = [(age, label_encoder.fit_transform([category])[0]) for age, category in features]

X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

model = LinearRegression()

model.fit(X_train, y_train)

predictions = model.predict(X_test)

mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')


def predict_payment(age, insurance_category):
    insurance_category = label_encoder.transform([insurance_category])[0]
    prediction = model.predict([[age, insurance_category]])
    prediction = np.clip(prediction, 0, 1)
    return prediction[0]
