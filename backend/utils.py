import pickle

with open("phishing_detector_latest.pkl", "rb") as f:
    model = pickle.load(f)

def predict_email(email_text):
    """
    Predicts if the given email text is phishing.
    Returns:
        {
            "is_phishing": True/False,
            "confidence": float (0-1),
            "category": "Phishing Email" or "Safe Email"
        }
    """
    prediction = model.predict([email_text])[0]  
    proba = model.predict_proba([email_text])[0]
    
    class_index = list(model.classes_).index(prediction)
    confidence = proba[class_index]

    is_phishing = prediction == "Phishing Email"

    return {
        "is_phishing": is_phishing,
        "confidence": round(confidence, 4),
        "category": prediction
    }
