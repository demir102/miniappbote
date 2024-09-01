const TELEGRAM_BOT_TOKEN = '110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw'; 
// https://core.telegram.org/bots#creating-a-new-bot

export const verifyTelegramWebAppData = async (telegramInitData: string): boolean => {
  // Данные представляют собой строку запроса, состоящую из серии пар поле-значение.
  const encoded = decodeURIComponent(telegramInitData); 
  
  
  // Подпись HMAC-SHA-256 токена бота с постоянной строкой WebAppData, используемой в качестве ключа.
  const secret = crypto
    .createHmac('sha256', 'WebAppData')
    .update(TELEGRAM_BOT_TOKEN);

  // Data-check-string — это цепочка всех полученных полей'.
  const arr = encoded.split('&');
  const hashIndex = arr.findIndex(str => str.startsWith('hash='));
  const hash = arr.splice(hashIndex)[0].split('=')[1];
  // отсортировано по алфавиту
  arr.sort((a, b) => a.localeCompare(b));
  // в формате key=<value> с символом перевода строки ('\n', 0x0A), используемым в качестве разделителя
  // например, 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<пользователь>
  const dataCheckString = arr.join('\n');
  
  // Шестнадцатеричное представление подписи HMAC-SHA-256 строки проверки данных с секретным ключом.
  const _hash = crypto
    .createHmac('sha256', secret.digest())
    .update(dataCheckString)
    .digest('hex');
  
  // если хэши равны, данные могут использоваться на вашем сервере.
  // Сложные типы данных представлены как сериализованные объекты JSON.
  return _hash === hash;
};