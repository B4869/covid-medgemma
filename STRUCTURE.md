```
covid_medgemma/
│
├── README.md                          # Documentation หลัก
├── STRUCTURE.md                       # ไฟล์นี้
│
├── backend/                           # Backend API (Flask)
│   └── api/
│       └── chat/
│           ├── .env                   # Environment variables
│           ├── .gitignore             # Git ignore rules
│           ├── app.py                 # Main Flask application
│           ├── requirements.txt       # Python dependencies
│           ├── instruction_model/     # Instruction model files
│           └── modules/               # Python modules
│               ├── __init__.py
│               ├── classifier_model.py # Model สำหรับจำแนก queries
│               ├── login_hf.py        # Hugging Face login & authentication
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
            │
            ├── .gitignore             # Git ignore rules
            ├── .next/                 # Next.js build output
            ├── node_modules/          # Node.js packages
            ├── public/                # Static assets
            │   ├── file.svg
            │   ├── globe.svg
            │   ├── next.svg
            │   ├── vercel.svg
            │   ├── window.svg
            │   └── images/
            │       └── logo.png       # Application logo
            │
            └── app/                   # Next.js app directory
                ├── layout.tsx         # Root layout component
                ├── page.tsx           # Main page component
                ├── globals.css        # Global styles
                ├── favicon.ico
                │
                ├── components/        # React components
                │   ├── ChatInput.tsx      # Input field for user messages
                │   ├── ChatWindow.tsx     # Main chat window container
                │   ├── FormattedText.tsx  # Markdown text formatter
                │   ├── Header.tsx        # Header/title component
                │   ├── MessageItem.tsx   # Individual message component
                │   └── MessageList.tsx   # List of all messages
                │
                └── lib/               # Utility functions
                    ├── simpleBot.ts   # Basic chatbot logic
                    └── getBotReply.ts # API call to backend
```