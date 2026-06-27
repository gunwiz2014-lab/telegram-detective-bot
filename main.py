import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', 
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Данные о деле
CASE_DATA = {
    "crime_scene": "В кабинете найден известный коллекционер. Дверь заперта изнутри, окно открыто.",
    "clues": "На столе лежит пустой бокал со следами помады, а на полу — обрывок мужского шарфа.",
    "suspects": ["Горничная Анна", "Бизнес-партнер мистер Блэк"],
    "killer": "Бизнес-партнер мистер Блэк",
    "solution_text": "Верно! Мистер Блэк инсценировал кражу через окно, но оставил свой шарф, когда спешил уйти. Вы раскрыли дело!"
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [InlineKeyboardButton("🔍 Осмотреть улики", callback_data='clues')],
        [InlineKeyboardButton("👥 Свидетели", callback_data='suspects')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = f"🕵️‍♂️ **Новое дело!**\n\n{CASE_DATA['crime_scene']}\n\nС чего начнёте расследование?"
    
    if update.message:
        await update.message.reply_text(text, reply_markup=reply_markup, parse_mode="Markdown")
    elif update.callback_query:
        await update.callback_query.edit_message_text(text, reply_markup=reply_markup, parse_mode="Markdown")

async def inspect_clues(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    
    keyboard = [[InlineKeyboardButton("👥 Допросить подозреваемых", callback_data='suspects')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        text=f"🔎 **Улики:**\n{CASE_DATA['clues']}\n\nЧто делаем дальше?",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

async def show_suspects(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    
    keyboard = [
        [InlineKeyboardButton(suspect, callback_data=f"accuse_{suspect}")] 
        for suspect in CASE_DATA['suspects']
    ]
    keyboard.append([InlineKeyboardButton("🔙 Вернуться к началу", callback_data='start_over')])
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        text="👥 **Подозреваемые:**\nКого вы считаете убийцей?",
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

async def check_solution(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()
    
    selected_suspect = query.data.replace("accuse_", "")
    
    if selected_suspect == CASE_DATA['killer']:
        keyboard = [[InlineKeyboardButton("🔄 Начать заново", callback_data='start_over')]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.edit_message_text(text=f"🎉 {CASE_DATA['solution_text']}", reply_markup=reply_markup)
    else:
        keyboard = [[InlineKeyboardButton("🔙 Назад к подозреваемым", callback_data='suspects')]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.edit_message_text(
            text=f"❌ **Ошибка!** {selected_suspect} клянется, что невиновен. У вас нет веских доказательств против него. Попробуйте еще раз.",
            reply_markup=reply_markup,
            parse_mode="Markdown"
        )

def main():
    # Забираем токен из переменных окружения Railway
    TOKEN = os.getenv("TELEGRAM_TOKEN")
    if not TOKEN:
        logger.error("Переменная TELEGRAM_TOKEN не найдена!")
        return

    app = Application.builder().token(TOKEN).build()

    # Обработчики команд и кнопок
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(start, pattern='start_over'))
    app.add_handler(CallbackQueryHandler(inspect_clues, pattern='clues'))
    app.add_handler(CallbackQueryHandler(show_suspects, pattern='suspects'))
    app.add_handler(CallbackQueryHandler(check_solution, pattern='^accuse_'))

    logger.info("Бот запущен...")
    app.run_polling()

if __name__ == '__main__':
    main()
