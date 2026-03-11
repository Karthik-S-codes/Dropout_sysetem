from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "dropout_model.pkl")
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found: {model_path}")
model = joblib.load(model_path)

@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "message": "Dropout prediction API"}), 200


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON body"}), 400

    try:
        attendance = float(data["attendance"])
        gpa = float(data["gpa"])
        backlogs = int(data["backlogs"])
        assignment_rate = float(data["assignment_rate"])
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e.args[0]}"}), 400
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid field types"}), 400

    features = np.array([[attendance, gpa, backlogs, assignment_rate]])

    try:
        if hasattr(model, "predict_proba"):
            prob = model.predict_proba(features)[0][1]
        else:
            prob = float(model.predict(features)[0])
    except Exception as e:
        return jsonify({"error": f"Model prediction error: {e}"}), 500

    return jsonify({"probability": float(prob)})

if __name__ == "__main__":
    app.run(debug=True)
