# Dropout_sysetem

A full-stack student dropout prediction system with a React UI, a Node/Express API, and a Python ML service.

## Architecture

- **Frontend (React + Vite)**: Form to enter student data and a dashboard to view predictions.
- **Backend (Node + Express + MongoDB)**: Receives form data, calls the ML API, stores predictions, and serves them to the UI.
- **ML API (Python + Flask)**: Loads a trained model and returns dropout probability for a student record.

## Project Structure

```
backend-node/      # Node/Express API
frontend-react/    # React UI (Vite)
ml-python/         # Flask ML API + training script
dataset/           # CSV training data
```

## Prerequisites

- Node.js 18+ (recommended)
- Python 3.10+
- MongoDB Atlas or local MongoDB

## Environment Variables

Create `backend-node/.env` with the following:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3000
ML_API_URL=http://127.0.0.1:5000
```

## Setup

### Backend

```
cd backend-node
npm install
```

### Frontend

```
cd frontend-react
npm install
```

### ML API

```
cd ml-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

If `requirements.txt` is missing, install the basics:

```
pip install flask numpy pandas scikit-learn joblib
```

## Run (Development)

Start the ML API:

```
cd ml-python
.venv\Scripts\activate
python ml_api.py
```

Start the backend:

```
cd backend-node
npm run dev
```

Start the frontend:

```
cd frontend-react
npm run dev
```

## API Endpoints

Backend (`http://localhost:3000`):

- `POST /api/students/predict` - predict and store a student result
- `GET /api/students` - list saved predictions

ML API (`http://127.0.0.1:5000`):

- `POST /predict` - returns `{ probability }`

Example payload for prediction:

```
{
	"name": "Student Name",
	"attendance": 85,
	"gpa": 7.8,
	"backlogs": 1,
	"assignment_rate": 90
}
```

## Model Training

Training script: `ml-python/train_model.py`

The model file is saved as `ml-python/dropout_model.pkl` and is loaded by the Flask API.

## Notes

- If MongoDB is not connected, the backend will reject prediction storage.
- Keep `.env` files out of version control.