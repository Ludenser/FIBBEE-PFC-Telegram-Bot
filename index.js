const
    { Telegraf, Scenes, session } = require('telegraf'),
    TelegrafI18n = require('telegraf-i18n'),
    updateLogger = require('telegraf-update-logger'),
    chalk = require('chalk'),
    path = require('path'),
    sendMessageError = require('./utils/sendMessageError'),
    startComposer = require('./composers/start.composer'),
    mainMenuComposer = require('./composers/mainMenu.composer'),
    routesInfoComposer = require('./composers/routesInfo.composer'),
    selectRouteComposer = require('./composers/selectRoute.composer');

require('dotenv').config();

const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    allowMissing: false, // Default true
    directory: path.resolve(__dirname, 'locales')
})
const token = process.env.TOKEN;

const bot = new Telegraf(token)

const routeNumber = undefined;

/* Log Function */
bot.use(
    updateLogger({
        colors: {
            id: chalk.red,
            chat: chalk.yellow,
            user: chalk.green,
            type: chalk.bold,
        },
    }),
);

/* Command */
// bot.command('axiosxmpl', async (ctx) => {
//     let input = ctx.message.text
//     let inputArray = input.split(" ")
//     let message = "";

//     if (inputArray.length == 1) {
//         message = "Пожалуйста, введите текст, например: /axiosxmpl snowman"
//         ctx.reply(message)
//     } else {
//         sendProses(ctx, bot)
//         inputArray.shift();
//         messager = inputArray.join(" ")
//         try {
//             const link = await axios.get(`http://hhh.fff.com/api/axiosxmpl?apikey=${key}&query=${messager}`)
//             const { result } = link.data
//             const axiObj = result.slice(0, 3)
//             axiObj.forEach(async (res) => {
//                 ctx.replyWithPhoto({ url: res.thumbnail }, {
//                     caption: `──────✿ 𝐒𝐞𝐚𝐫𝐜𝐡 ✿──────

// ❖ Title: ${res.title}
// ❖ Link: https://www.youtube.com/watch?v=${res.videoId}
// ❖ Published: ${res.published}
// ❖ Viewrs: ${res.views}

// `})

//             })
//         } catch (e) {
//             messageError(ctx)
//         }
//     }
// })

bot.context.routeNumber = routeNumber

bot.use(i18n.middleware())

bot.use(startComposer)
bot.use(mainMenuComposer)
bot.use(routesInfoComposer)
bot.use(selectRouteComposer)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
