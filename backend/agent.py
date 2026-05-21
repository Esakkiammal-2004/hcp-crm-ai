from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from tools.log_interaction import log_interaction
from typing import TypedDict
import os, json
from dotenv import load_dotenv
load_dotenv()

class AgentState(TypedDict):
    input: str
    extracted_data: dict

llm = ChatGroq(model="gemma2-9b-it", api_key=os.getenv("GROQ_API_KEY"))

def extract_node(state):
    prompt = f"""Extract as JSON from: {state['input']}. Keys: hcp_name, date, drug_discussed, sentiment, outcome, follow_up. Only JSON."""
    res = llm.invoke(prompt).content
    data = json.loads(res.strip().strip('```json').strip('```'))
    return {"extracted_data": data}

def log_node(state):
    output = log_interaction(state['extracted_data'])
    return {}

workflow = StateGraph(AgentState)
workflow.add_node("extract", extract_node)
workflow.add_node("log", log_node)
workflow.set_entry_point("extract")
workflow.add_edge("extract", "log")
workflow.add_edge("log", END)
agent_app = workflow.compile()

def run_agent(text):
    result = agent_app.invoke({"input": text})
    return result['extracted_data']