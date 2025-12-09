# COVID MedGemma

## Project Structure

- **Backend**: Python (Flask/FastAPI)
- **Frontend**: Next.js (React)

## Setup and Installation

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend/api/chat
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu130; pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in `backend/api/chat/` with:
   ```
   HF_TOKEN=your_huggingface_read_token
   GEM_TOKEN=your_aistudio_token
   ```

5. Run the application:
   ```bash
   python app.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/app/web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
