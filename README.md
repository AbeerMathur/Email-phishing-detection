## CatPhish AI: Email Phishing Detection using an Ensemble ML Approach

---

## Overview

**CatPhish AI** is a real-time phishing email detection system built on the research work titled **"Unified Approach Integrating Machine Learning Algorithms for Detection of e-Mail Phishing Attacks"**, published at the **2024 International Conference on Computing, Sciences and Communications (ICCSC)**.

This application leverages a hybrid ensemble of NLP-powered **Support Vector Machine** and **Random Forest** models. It delivers precise classification of email content as **Phishing Email** or **Safe Email**, and is backed by a Flask API and a Chakra UI React frontend.

---

## Authors

- **Abeer Mathur** – [LinkedIn](https://in.linkedin.com/in/abeermathur)
- **Usha Devi Gandhi** 
- **Abhinav Sudhakar Dubey**
- **Pranav Singh Mahara**

> Affiliation: Vellore Institute of Technology, Vellore, India  
> Contact: abeermathur17@gmail.com | pranavsmahara@gmail.com

---

## Project Highlights

- **Problem Addressed:**  
  With over 3.4 billion phishing emails sent daily and incidents taking up to 295 days to detect, email phishing remains a critical cybersecurity threat.

- **Solution Provided:**  
  A unified ensemble model combining:
  - **Natural Language Processing (NLP)** for semantic understanding
  - **Support Vector Machine (SVM)** for high-precision classification
  - **Random Forest (RF)** for decision robustness

- **Backend:** Python Flask API serving a `.pkl` model trained via Scikit-learn.
- **Frontend:** React + Chakra UI user interface.
- **Deployment:** Dockerized and deployed on Render.

---

## Research Summary

### Abstract

> Phishing attacks exploit human vulnerabilities through deceptive emails. This study introduces a unified approach integrating **Natural Language Processing**, **Support Vector Machine**, and **Random Forest**, achieving a remarkable **98.7% accuracy**. The ensemble is optimized using **TF-IDF vectorization**, **grid search**, and **5-fold cross-validation**, offering a transparent and robust phishing detection solution.

---

## Methodology

### 1. Dataset

- **Source:** Public Kaggle Dataset — *Phishing Email Detection*
- **Samples:** 11,376 safe emails + 7,274 phishing emails
- **Features:** 
  - `Email Text`
  - `Email Type` (Phishing / Safe)

### 2. Preprocessing

- Missing value handling
- Train-test split with reproducibility seed
- **TF-IDF Vectorizer** (max features: 10,000, English stopwords removed)

### 3. Unified Model Architecture

- **VotingClassifier** (soft voting)
  - `RandomForestClassifier(n_estimators=100, max_depth=20)`
  - `SVC(kernel='linear', probability=True, C=1)`
- Optimized with:
  - Grid Search
  - Cross-validation (5-fold)
  - Class weighting (phishing: 2, safe: 1)

---

## Evaluation Metrics

| Metric        | Phishing Email | Safe Email | Macro Avg | Weighted Avg |
|---------------|----------------|------------|-----------|--------------|
| Precision     | 0.97           | 0.99       | 0.98      | 0.99         |
| Recall        | 0.99           | 0.98       | 0.99      | 0.98         |
| F1 Score      | 0.98           | 0.99       | 0.99      | 0.99         |
| Accuracy      |                |            |           | **98.7%**     |

---

## Comparative Analysis

| Model              | Accuracy | Precision | Recall | F1-Score |
|--------------------|----------|-----------|--------|----------|
| Logistic Regression| 95%      | 95%       | 72%    | 82%      |
| Naive Bayes        | 97%      | 100%      | 80%    | 89%      |
| Decision Trees     | 93%      | 85%       | 61%    | 71%      |
| K-Nearest Neighbors| 90%      | 100%      | 29%    | 45%      |
| Random Forest      | 97%      | 97%       | 81%    | 89%      |
| **Unified Model**  | **98%**  | **99%**   | **98%**| **99%**  |

---

## UI Features

- ✅ Input box for full email content
- 📊 Real-time prediction
- 🔐 Confidence score output
- 🟢 "Safe Email" / 🔴 "Phishing Email" tag display

---

## Key Contributions

- Novel ensemble model for email phishing detection
- Robust evaluation using a large, real-world dataset
- Real-time web application with a clean UX
- Deployment with Docker and cloud hosting (Render)

---

## Acknowledgments

- Kaggle – for the dataset
- IEEE ICCSC 2024 – for peer-reviewed publication
- VIT University – for research guidance

---

## License

This repository is intended for **academic and research purposes only**.  
Model weights and source code are **not licensed for commercial use**.

