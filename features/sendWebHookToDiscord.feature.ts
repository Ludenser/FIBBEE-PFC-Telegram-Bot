import { Webhook } from 'discord-webhook-node';
/**
  * Отправка сообщения в дискорд
  * @param {String} username - username текущего пользователя
  * @param {String} message - текст отправляемого сообщения
  * @param {String} webHook_URL - URL вебхука дискорд канала
  */
export default async (username: string, message: string, webHook_URL: string) => {
  // let WebHookURL = ''
  // switch (location_label_value) {
  //   case '805356d4-1ca8-47b6-b877-f9dfb4f40d01':
  //     WebHookURL = process.env.SIBUR_WEBHOOK;
  //     break;
  //   case '9b85928e-71b0-48f3-bdc1-858ce3d22dab':
  //     WebHookURL = process.env.PYATNITSKAYA_WEBHOOK;
  //     break;
  //   case 'c2701632-d97d-409a-b987-30720c613af9':
  //     WebHookURL = process.env.QUARTAL_WEBHOOK;
  //     break;
  //   case '67987b1b-7bf0-4411-91b6-49b2e330f6e7':
  //     WebHookURL = process.env.MOZAIKA_WEBHOOK;
  //     break;
  //   case '3a113489-3701-4362-ac2b-a44c6533ac65':
  //     WebHookURL = process.env.MBD_WEBHOOK;
  //     break;
  //   case 'f86705d1-2a66-4e59-b5ee-6dda2d8320ca':
  //     WebHookURL = process.env.AFKSISTEMA_WEBHOOK;
  //     break;
  //   case '495d9124-b9a4-466a-a173-6c887f3ac6bc':
  //     WebHookURL = process.env.RAIF_WEBHOOK;
  //     break;
  //   case '0097ef52-f820-40a8-95ce-f02709bc1795':
  //     WebHookURL = process.env.SKOLKOVO_WEBHOOK;
  //     break;
  //   case '481574dd-5fda-4b8c-9025-1a800fdd28c6':
  //     WebHookURL = process.env.ORBION_WEBHOOK;
  //     break;
  //   case '26e5ed38-b636-4048-a3f2-ed4129c3d0f7':
  //     WebHookURL = process.env.AVIAPARK_WEBHOOK;
  //     break;
  // }

  const hook = new Webhook(webHook_URL);
  hook.setUsername(username)
  await hook.send(message)
  console.log('Sent webhook successfully!')
}

