from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()
app = FastAPI()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NoteRequest(BaseModel):
    text: str

@app.post("/parse_note")
async def parse_note(request: NoteRequest):
    print("Frontend :", request.text)

    today = datetime.now().strftime("%Y-%m-%d")


    prompt = f"""
    You are an expert data entry assistant. Parse the medical rep's notes and return ONLY a valid JSON.
    Text: "{request.text}"

    Extract these fields and return JSON:
    {{
        "hcp_name": "Doctor name",
        "interaction_type": "Meeting/Call/Email/Conference",
        "date": "YYYY-MM-DD format",
        "time": "HH:MM AM/PM format in 24-hours.convert 3pm to 15:00, 9:30am to 09:30" ,
        "attendees": "Other people present, comma separated",
        "topics_discussed": "Main discussion points",
        "drug_discussed": "Medicine/Product name",
        "feedback": "positive/neutral/negative",
        "materials_shared": "Brochures, PDFs etc",
        "samples_distributed": "Number or name of samples",
        "outcomes": "What happened/result",
        "follow_up": "Next action"
    }}

    If any field is missing, return empty string "".
    For date, use today's date if not mentioned: {today}
    """

    try:
        # FIX 1: Model Name 
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant", # ←  New Model
            response_format={"type": "json_object"},
            temperature=0.2
        )
        response_text = chat_completion.choices[0].message.content
        print("Groq Raw Response:", response_text)
        parsed_json = json.loads(response_text)
        print("Backend :", parsed_json)
        return parsed_json

    except Exception as e:
        print("Error:", e)
        return {
            "hcp_name": "", "interaction_type": "Meeting", "date": "",
            "time": "", "attendees": "", "topics_discussed": "",
            "drug_discussed": "", "feedback": "neutral", "materials_shared": "",
            "samples_distributed": "", "outcomes": "", "follow_up": "",
            "error": str(e)
        }