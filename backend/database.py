import sqlite3

def init_db():
    conn = sqlite3.connect('crm.db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS interactions
                     (id INTEGER PRIMARY KEY AUTOINCREMENT, hcp_name TEXT, date TEXT,
                      drug_discussed TEXT, sentiment TEXT, outcome TEXT, follow_up TEXT)''')
    conn.commit()
    conn.close()

def save_interaction(data):
    conn = sqlite3.connect('crm.db')
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO interactions (hcp_name, date, drug_discussed, sentiment, outcome, follow_up)
                     VALUES (?,?,?,?,?,?)""",
                  (data.get('hcp_name'), data.get('date'), data.get('drug_discussed'),
                   data.get('sentiment'), data.get('outcome'), data.get('follow_up')))
    conn.commit()
    conn.close()

init_db()