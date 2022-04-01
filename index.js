const
    { Telegraf } = require('telegraf'),
    TelegrafI18n = require('telegraf-i18n'),
    axios = require('axios'),
    updateLogger = require('telegraf-update-logger'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs'),
    messageError = require('./utils/sendMessageError'),
    { sendSearch, sendProses, sendLoading } = require('./utils/sendLoadings');

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

bot.command('axiosxmpl', async (ctx) => {
    let input = ctx.message.text
    let inputArray = input.split(" ")
    let message = "";

    if (inputArray.length == 1) {
        message = "Пожалуйста, введите текст, например: /axiosxmpl snowman"
        ctx.reply(message)
    } else {
        sendProses(ctx, bot)
        inputArray.shift();
        messager = inputArray.join(" ")
        try {
            const link = await axios.get(`http://hhh.fff.com/api/axiosxmpl?apikey=${key}&query=${messager}`)
            const { result } = link.data
            const axiObj = result.slice(0, 3)
            axiObj.forEach(async (res) => {
                ctx.replyWithPhoto({ url: res.thumbnail }, {
                    caption: `──────✿ 𝐒𝐞𝐚𝐫𝐜𝐡 ✿──────
        
❖ Title: ${res.title}
❖ Link: https://www.youtube.com/watch?v=${res.videoId}
❖ Published: ${res.published}
❖ Viewrs: ${res.views}

`})

            })
        } catch (e) {
            messageError(ctx)
        }
    }
})

bot.context.routeNumber = routeNumber

bot.use(i18n.middleware())

bot.use(require('./composers/start.composer'))
bot.use(require('./composers/info.composer'))
bot.use(require('./composers/docs.composer'))
bot.use(require('./composers/driverMenu.composer'))
bot.use(require('./composers/routesInfo.composer'))
bot.use(require('./composers/selectRoute.composer'))
console.log(bot)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
