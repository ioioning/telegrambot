from flask import Flask, request, jsonify
import sqlite3

app = Flask(Stock)

# ініціалізація SQLite
def init_db():
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            wallet TEXT,
            balance REAL DEFAULT 0
        )
        """)
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            prize TEXT
        )
        """)
        conn.commit()

init_db()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    user_id = data["user_id"]
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT OR IGNORE INTO users (user_id) VALUES (?)", (user_id,))
        conn.commit()
    return jsonify(success=True)

@app.route("/set_wallet", methods=["POST"])
def set_wallet():
    data = request.json
    user_id = data["user_id"]
    wallet = data["wallet"]
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET wallet = ? WHERE user_id = ?", (wallet, user_id))
        conn.commit()
    return jsonify(success=True)

@app.route("/open_case", methods=["POST"])
def open_case():
    data = request.json
    user_id = data["user_id"]

    # Тут перевірка балансу
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT balance FROM users WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        if not row or row[0] < 1:
            return jsonify(success=False, message="Not enough balance")

        # Вирахуємо 1 TON за кейс
        cursor.execute("UPDATE users SET balance = balance - 1 WHERE user_id = ?", (user_id,))

        # Випадковий подарунок
        from random import choice
        prizes = ['100 TON', 'Swiss Watch', 'Berry Box', 'nothing']
        prize = choice(prizes)

        # Записати приз
        if prize != 'nothing':
            cursor.execute("INSERT INTO gifts (user_id, prize) VALUES (?, ?)", (user_id, prize))

        conn.commit()
    return jsonify(success=True, prize=prize)

@app.route("/my_gifts", methods=["POST"])
def my_gifts():
    user_id = request.json["user_id"]
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT prize FROM gifts WHERE user_id = ?", (user_id,))
        gifts = [row[0] for row in cursor.fetchall()]
    return jsonify(success=True, gifts=gifts)

@app.route("/topup_callback", methods=["POST"])
def topup_callback():
    # цей endpoint ти викликаєш вручну, коли бачиш транзакцію в TON
    data = request.json
    user_id = data["user_id"]
    amount = data["amount"]
    with sqlite3.connect("users.db") as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET balance = balance + ? WHERE user_id = ?", (amount, user_id))
        conn.commit()
    return jsonify(success=True)

