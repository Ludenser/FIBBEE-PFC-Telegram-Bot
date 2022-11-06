import { Webhook } from 'discord-webhook-node';
/**
  * Отправка сообщения в дискорд
  * @param {string} username - username текущего пользователя
  * @param {string} message - текст отправляемого сообщения
  * @param {string} webHook_URL - URL вебхука дискорд канала
  */
export default async (username: string, message: string, webHook_URL: string) => {

  const hook = new Webhook(webHook_URL);
  hook.setUsername(username)
  await hook.send(message)
  console.log('Sent webhook successfully!')
}

