HCP CRM Agent - LangGraph + Groq

AI-powered assistant that automates CRM logging, follow-up emails, and meeting scheduling for pharma sales reps using natural language.

📋 Project Overview
Sales reps spend 2+ hours daily on manual CRM updates after doctor visits. This agent takes meeting notes in plain English and autonomously executes 3+ backend tasks using LangGraph + Groq. One paragraph input → CRM updated, email sent, next meeting booked.

🛠️ LangGraph Tools Implemented
This project demonstrates all 5 required tools:

| Tool Name | Purpose |
| --- | --- |
| `get_hcp_data` | Fetches HCP profile & history from CRM |
| `log_interaction` | Saves meeting summary to CRM database |
| `generate_email` | Creates personalized follow-up email draft |
| `schedule_followup` | Books next meeting in Google/Outlook calendar |
| `send_email` | Sends the drafted email to HCP |

🚀 How to Run
1. Prerequisites
- Python 3.10+
- Groq API Key

2. Setup
```bash
git clone https://github.com/[your-username]/hcp-crm-agent-langgraph.git
cd hcp-crm-agent-langgraph
pip install -r requirements.txt
3. Environment
Create `.env` file:
GROQ_API_KEY=your_groq_key_here
4. Start App
uvicorn main:app --reload
Open `http://localhost:8000`

🧪 How to Test - Demo Flow
1. *Fill Form*: HCP Name: `Dr. Esakkiammal`, Date: `21-05-2026`, Drug: `Carditane 10mg`
2. *AI Assistant Input*:
   Met Dr. Esakkiammal today. Discussed Carditane 10mg efficacy and new hypertension guidelines. 
   Positive feedback. Log this interaction to CRM, draft a personalized follow-up email, 
   and schedule next meeting for next week.
3. *Click Send*: Watch backend terminal. Agent will call: `get_hcp_data` → `log_interaction` → `generate_email` → `schedule_followup`
4. *Verify Output*: Check response for CRM log confirmation, email draft, and calendar event.

📁 Project Structure
├── backend/
│ ├── agent.py # LangGraph agent + 5 tools definition
│ ├── main.py # FastAPI endpoints
│ └── tools/ # CRM, Email, Calendar tool logic
├── frontend/
│ └── index.html # Simple UI for demo
├── requirements.txt
└── README.md
🏗️ Code Explanation
`agent.py` uses LangGraph's `StateGraph` to create an autonomous agent. The Groq LLM with Llama-3-70B analyzes the user prompt, decides the tool sequence, and executes them. No hardcoding - the LLM chooses tools based on context.

💡 Task Understanding
The goal was to build a multi-tool LangGraph agent that solves a real business problem. This HCP CRM agent proves LLMs can replace manual workflows by chaining API calls autonomously from natural language, saving 2+ hours per rep per day.

---
*Built for Groq x LangGraph Hackathon 2026*


Backend Setup:

```bash
cd backend
pip install fastapi uvicorn langgraph langchain sqlite3 python-dotenv
python main.py
py -m uvicorn main:app --reload --port 9000

Frontend Setup:
cd frontend
npm install
npm start
---
**Built for Groq x LangGraph Hackathon 2026**
---
