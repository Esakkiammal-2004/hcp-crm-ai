from database import save_interaction
def log_interaction(data):
    print(f"Logging: {data}")
    save_interaction(data)
    return {"status": "logged", "data": data}