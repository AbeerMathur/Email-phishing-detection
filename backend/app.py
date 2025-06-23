from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import predict_email

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    email_text = data.get("email")

    if not email_text:
        return jsonify({"error": "No email content provided"}), 400

    result = predict_email(email_text)
    return jsonify(result)
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)

