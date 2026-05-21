                                       HCP CRM Agent 
                                       
HCP CRM Agent - LangGraph + Groq

AI-powered assistant for pharma sales reps to automate CRM logging, email drafting, and follow-up scheduling using natural language.

🎯 Problem
Sales reps waste 2+ hours daily on manual CRM updates after HCP meetings. This kills productivity and delays follow-ups.

💡 Solution
Type meeting notes in plain English. Our LangGraph agent uses Groq LLM to understand intent and autonomously calls the right tools. One paragraph → CRM logged, email drafted, next meeting booked.

🛠️ Tools Used
| Tool | Function |
| --- | --- |
| `get_hcp_data` | Fetch HCP details from CRM |
| `log_interaction` | Save meeting notes to CRM |
| `generate_email` | Draft personalized follow-up email |
| `schedule_followup` | Book next meeting in calendar |
| `send_email` | Send the drafted email |

🚀 How to Use
1. **Fill Form**: HCP Name, Date, Topics, Drug, Feedback
2. **AI Assistant**: Paste interaction summary
   Met Dr. Esakkiammal today on 21-05-2026. Discussed Carditane 10mg for hypertension. 
   Log this interaction to CRM, draft a personalized follow-up email, and schedule next meeting.
3. **Click Send**: Agent triggers tool chain: `get_hcp_data` → `log_interaction` → `generate_email` → `schedule_followup`
4. **Output**: See CRM confirmation, email draft, and calendar invite

⚙️ Tech Stack
- **Agent Framework**: LangGraph 
- **LLM**: Llama 3 70B via Groq API
- **Backend**: FastAPI + Python
- **Tools**: Custom CRM + Email + Calendar APIs

⚡ Quick Start
1. Clone repo: `git clone https://github.com/your-username/hcp-crm-agent-langgraph.git`
2. Install: `pip install -r requirements.txt`
3. Add `.env`: `GROQ_API_KEY=your_key_here`
4. Run: `uvicorn main:app --reload`
5. Open: `http://localhost:9000`


 structure
 
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
