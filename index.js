const
    { Telegraf } = require('telegraf'),
    axios = require('axios'),
    updateLogger = require('telegraf-update-logger'),
    chalk = require('chalk'),
    { Extra } = require('telegraf'),
    moment = require(`moment-timezone`),
    fs = require('fs'),
    canvacord = require("canvacord"),
    serialNumber = require('./utils/generateSN'),
    messageError = require('./utils/sendMessageError'),
    { sendSearch, sendProses, sendLoading } = require('./utils/sendLoadings'),
    sleep = require('./utils/getSleep'),
    { getObjRoutes, getMessageRoutes } = require('./lib/getRoute')

// Load Files
let setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))

let { token } = setting

const {
    menu,
    routesInfo,
    info,
    docs
} = require('./lib/menu')
/* Bot */

const bot = new Telegraf(token)

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

/* function */

const launchMessage = async (ctx) => {
    const helper = 'Для начала обслуживания нужно выбрать маршрут'
    await bot.telegram.sendMessage(ctx.chat.id, helper,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '1️⃣', callback_data: 'route1' },
                        { text: '2️⃣', callback_data: 'route2' }
                    ],
                    [
                        { text: '❔Информация по маршрутам❔', callback_data: 'routesInfo' }
                    ],
                    [
                        { text: 'Back!🔙', callback_data: 'start' }
                    ]
                ]
            },
            parse_mode: "Markdown"

        })
}

const routesInfoMessage = async (ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, getMessageRoutes(), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back!🔙', callback_data: 'launchChecklist' }
                ]
            ]
        },
        parse_mode: "Markdown"

    })
}

/* Command */



bot.command('menu', (ctx) => {
    try {
        ctx.deleteMessage()
        sendMessageStart(ctx)
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, error)
    }

})

bot.action('routesInfo', (ctx) => {
    try {
        ctx.deleteMessage()
        routesInfoMessage(ctx)
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, error)
    }

})

bot.action('launchChecklist', (ctx) => {
    try {
        ctx.deleteMessage()
        launchMessage(ctx)
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, error)
    }

})

bot.action('route1', (ctx) => {
    try {
        ctx.deleteMessage()
        sendMessageStart(ctx)
    } catch (error) {
        bot.telegram.sendMessage(ctx.chat.id, error)
    }

})

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
bot.use(require('./composers/start.composer'))
bot.use(require('./composers/info.composer'))
bot.use(require('./composers/docs.composer'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
