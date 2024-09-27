type Locale = Record<string, string>;

const locale = {
  message_welcome:
    "Привет\\! Поддержка Rutube на связи 👋\n\nПоможем найти ответ на самые каверзные вопросы\\!\n\nПиши свой вопрос\\!\nНапример\\: `Как скачать видео?`",
  message_error: "Кажется, это был не вопрос 😢\n\nДавай попробуем ещё раз!",
  message_server_error: "При генерации произошла ошибка :(",
  message_new: "Начнем всё сначала! Задавай вопрос.",
  message_unknown_payload:
    "Я не понимаю такие сообщения\\! Сделаю вид, что ничего не видел 👀",
} satisfies Locale;
type AvailableLocaleKeys = keyof typeof locale;

export const _ = (
  key: AvailableLocaleKeys,
  replacements?: Record<string, any>
) => {
  if (key in locale) {
    let val = locale[key];
    if (!replacements) return val;
    for (const [key, value] of Object.entries(replacements)) {
      val = val.replace(`%${key}%`, value);
    }
    return val;
  }
  throw new Error(`Unknown locale key: ${key}`);
};
