const { Webhook } = require('discord-webhook-node');
require('dotenv').config();

const sendMsgToDiscord = async (message, location_name) => {
  let WebHookURL = ''
  switch (location_name) {
    case 'Обслуживание Сибура':
      WebHookURL = process.env.SIBUR_WEBHOOK;
      break;
    case 'Обслуживание БЦ Пятницкий':
      WebHookURL = process.env.PYATNITSKAYA_WEBHOOK;
      break;
    case 'Обслуживание IQ-Квартал':
      WebHookURL = process.env.QUARTAL_WEBHOOK;
      break;
    case 'Обслуживание Мозаики':
      WebHookURL = process.env.MOZAIKA_WEBHOOK;
      break;
    case 'Обслуживание МБД':
      WebHookURL = process.env.MBD_WEBHOOK;
      break;
    case 'Обслуживание АФК Система':
      WebHookURL = process.env.AFKSISTEMA_WEBHOOK;
      break;
    case 'Обслуживание Райфайзен':
      WebHookURL = process.env.RAIF_WEBHOOK;
      break;
    case 'Обслуживание Сколково':
      WebHookURL = process.env.SKOLKOVO_WEBHOOK;
      break;
    case 'Обслуживание Орбион':
      WebHookURL = process.env.ORBION_WEBHOOK;
      break;
    case 'Обслуживание Авиапарк':
      WebHookURL = process.env.AVIAPARK_WEBHOOK;
      break;
  }

  const hook = new Webhook(WebHookURL);

  await hook.send(message)
  console.log('Sent webhook successfully!')

}

module.exports = sendMsgToDiscord

