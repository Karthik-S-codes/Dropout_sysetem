import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset (adjust path if needed)
dataset_path = os.path.join("..", "dataset", "student_data.csv")
data = pd.read_csv(dataset_path)

# Select features and target
X = data[["attendance", "gpa", "backlogs", "assignment_rate"]]
y = data["dropout"]

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train model
model.fit(X_train, y_train)

# Test model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", accuracy)

# Save trained model
joblib.dump(model, "dropout_model.pkl")

print("Model trained and saved as dropout_model.pkl")
