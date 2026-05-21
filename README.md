# HCP CRM AI - MailGeek AI

HCP CRM AI - MailGeek AI

AI-powered CRM system for Healthcare Professionals with automated email generation using LangGraph agents.

🚀 Tech Stack

- **Frontend**: React JS 18
- **Backend**: Python FastAPI  
- **AI Framework**: LangGraph
- **Database**: SQLite
- **API**: REST API

✨ Features

1. **AI Email Generation** - Generate personalized emails for HCPs using LangGraph agents
2. **CRM Dashboard** - Manage Healthcare Professional data
3. **HCP Database** - Store and retrieve HCP details
4. **LangGraph Tools Integration** - 5 custom tools for email automation
5. **Automated Follow-ups** - Track and manage email interactions

🛠️ LangGraph Tools Implemented

This project uses LangGraph agents with 5 custom tools:

1. **HCP Data Fetcher** - Retrieves HCP details from database
2. **Email Content Generator** - Creates personalized email content using AI
3. **Interaction Logger** - Logs all email interactions to database
4. **Follow-up Scheduler** - Schedules automated follow-up emails
5. **Email Sender** - Sends emails via SMTP/API integration

📦 Project Structure

hcp-crm-ai/
├── backend/
│ ├── http://agent.py # LangGraph agent implementation
│ ├── http://database.py # SQLite database setup
│ ├── http://main.py # FastAPI server
│ └── tools/
│ └── log_interaction.py # Custom LangGraph tools
└── frontend/
    ├── src/
    │ ├── http://App.js # Main React component
    │ └── http://index.js # React entry point
    ├── public/
    │ └── http://index.html # HTML template
    └── http://package.json # Frontend dependencies

🔧 How to Run Locally

Backend Setup 

```bash
cd backend
pip install fastapi uvicorn langgraph langchain sqlite3 python-dotenv
python main.py
Backend runs on `http://localhost:8000`

Frontend Setup :

cd frontend
npm install
npm start
Frontend runs on `http://localhost:3000`

📹 Demo

The application demonstrates:
1. Frontend UI for HCP management
2. LangGraph agent execution with all 5 tools
3. Real-time email generation and logging
4. Complete workflow from HCP selection to email delivery

📝 Note

This is a local development project created for submission purposes. The application requires local setup and is not deployed on cloud.

👨‍💻 Submission Details

- *Project*: HCP CRM AI Task
- *Framework*: LangGraph + React + FastAPI
- *Status*: Local Development Complete


**உன் `agent.py` ல வேற 5 Tools இருந்தா `LangGraph Tools Implemented` Section மட்டும் மாத்திக்கோ** 🚀
