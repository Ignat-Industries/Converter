// i18n.js

// Список кодов языков, которые будем подгружать
export const supportedLangs = [
  'en', 'ru', 'es', 'de', 'fr',
  'zh', 'pt', 'ar', 'hi', 'ja'
];

// Создаём экземпляр i18n без сообщений (messages = {})
export const i18n = VueI18n.createI18n({
  legacy: false,
  locale: 'en',         // язык по умолчанию
  fallbackLocale: 'en', // если перевод отсутствует — fallback
  messages: {}          // пустой объект (будем загружать динамически)
});

/**
 * Загружает файлы перевода из папки `./messages/`.
 * Для каждого языка (en, ru, es, ...) ищет `./messages/<lang>.json`.
 * Если найден — добавляет в i18n.
 */
export async function loadMessages() {
  const basePath = './messages';
  for (const lang of supportedLangs) {
    try {
      const response = await fetch(`${basePath}/${lang}.json`);
      if (!response.ok) continue; // если 404 — пропускаем

      const data = await response.json();
      // Записываем переводы в i18n для данного языка
      i18n.global.setLocaleMessage(lang, data);
    } catch (err) {
      console.warn(`Failed to load messages for ${lang}`, err);
    }
  }
}
