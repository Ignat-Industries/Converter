// i18n.js
// Создаём i18n, но пока без сообщений (messages будет пустым)
const i18n = VueI18n.createI18n({
  legacy: false,
  locale: 'en',         // Базовый язык по умолчанию
  fallbackLocale: 'en',
  messages: {}
});

// Какие языки поддерживаем — массив кодов
const supportedLangs = [
  'en', 'ru', 'es', 'de', 'fr',
  'zh', 'pt', 'ar', 'hi', 'ja'
];

/**
 * Загружает JSON-файлы переводов для каждого языка и
 * записывает их в i18n глобально
 */
async function loadMessages() {
  // Для всех кодов lang делаем fetch('./messages/lang.json')
  const fetchPromises = supportedLangs.map(async (lang) => {
    const response = await fetch(`./messages/${lang}.json`);
    const data = await response.json();
    return { lang, data };
  });

  // Ждём, пока все файлы загрузятся:
  const results = await Promise.all(fetchPromises);

  // Записываем переводы для каждого языка в i18n
  for (const { lang, data } of results) {
    i18n.global.setLocaleMessage(lang, data);
  }
}

// Экспортируем сам i18n и функцию loadMessages
export { i18n, loadMessages, supportedLangs };
