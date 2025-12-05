# COVID MedGemma - Project Structure

```
covid_medgemma/
│
├── README.md                          # Documentation หลัก
├── command.txt                        # คำสั่ง setup และ run project
├── PROJECT_STRUCTURE.md               # ไฟล์นี้
│
├── .git/                              # Git repository
│
├── venv/                              # Python virtual environment
│
├── backend/                           # Backend API server (Python)
│   └── api/
│       └── chat/
│           ├── app.py                 # Flask/FastAPI main application
│           ├── .env                   # Environment variables
│           │
│           ├── instruction_model/     # Model instructions และ configurations
│           │   ├── classifier_model.txt
│           │   └── main_model.txt
│           │
│           └── modules/               # Python modules
│               ├── __init__.py
│               ├── login_hf.py        # Hugging Face login & authentication
│               ├── classifier_model.py # Model สำหรับจำแนก queries
│               ├── main_model.py      # Main AI model (MedGemma)
│               └── __pycache__/       # Compiled Python files
│
└── frontend/                          # Frontend web application (Next.js)
    └── app/
        └── web/                       # Next.js 14+ web app
            ├── package.json           # Node.js dependencies
            ├── package-lock.json
            ├── tsconfig.json          # TypeScript configuration
            ├── next.config.ts         # Next.js configuration
            ├── tailwind.config.js     # Tailwind CSS configuration
            ├── postcss.config.mjs     # PostCSS configuration
            ├── eslint.config.mjs      # ESLint configuration
            ├── next-env.d.ts          # Next.js TypeScript definitions
            ├── README.md              # Frontend documentation
            ├── tsconfig.tsbuildinfo   # TypeScript build info
            │
            ├── .gitignore             # Git ignore rules
            ├── .next/                 # Next.js build output
            ├── node_modules/          # Node.js packages
            │
            ├── app/                   # Next.js app directory
            │   ├── layout.tsx         # Root layout component
            │   ├── page.tsx           # Main page component
            │   ├── globals.css        # Global styles
            │   ├── favicon.ico
            │   │
            │   ├── components/        # React components
            │   │   ├── ChatInput.tsx      # Input field for user messages
            │   │   ├── ChatWindow.tsx     # Main chat window container
            │   │   ├── Header.tsx        # Header/title component
            │   │   ├── MessageItem.tsx   # Individual message component
            │   │   └── MessageList.tsx   # List of all messages
            │   │
            │   └── lib/               # Utility functions
            │       ├── simpleBot.ts   # Basic chatbot logic
            │       └── getBotReply.ts # API call to backend
            │
            └── public/                # Static assets
                └── images/
                    └── logo.png       # Application logo
```

## Quick Start Commands

```bash
# Activate virtual environment
venv\Scripts\activate

# Run Backend API
python app.py

# Run Frontend Web App
cd frontend\app\web
npm run dev

# Test individual modules
python backend\api\chat\modules\login_hf.py
python backend\api\chat\modules\classifier_model.py
python backend\api\chat\modules\main_model.py
```

## Environment Setup

Create `.env` file in `backend/api/chat/` with:
```
HF_TOKEN=your_huggingface_read_token
GEM_TOKEN=your_aistudio_token
```

## Dependencies

### Python
- Flask/FastAPI
- Transformers (Hugging Face)
- torch/tensorflow

### Node.js
- React
- Next.js
- Tailwind CSS
- TypeScript
