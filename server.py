from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes
import os

TOKEN = os.getenv("7864290193:AAGZhC7xGrA4SYqE8jVXukFfEKtt3uFs2b4")  # або встав напряму

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("open", web_app=WebAppInfo(url="https://тут.git.page"))],
        [InlineKeyboardButton("prifile", callback_data="my_rewards")],
        [InlineKeyboardButton("deposit", callback_data="topup")],
        [InlineKeyboardButton("code", callback_data="promo")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Привіт! Обери дію:", reply_markup=reply_markup)

def main():
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    print("Bot is running...")
    app.run_polling()

if __name__ == "__main__":
    main()

