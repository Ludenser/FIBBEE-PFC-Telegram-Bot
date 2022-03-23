const { Telegraf } = require('telegraf')
const axios = require('axios')
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
const { Extra } = require('telegraf')
const moment = require(`moment-timezone`)
const fs = require('fs');
const { spawn, exec } = require('child_process');
const canvacord = require("canvacord");
const serialNumber = require('./utils/generateSN');
const messageError = require('./utils/sendMessageError');
const { sendSearch, sendProses, sendLoading } = require('./utils/sendLoadings')
const sleep = require('./utils/getSleep');
const { getObjRoutes, getMessageRoutes } = require('./lib/getRoute')

// Load File
let setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))

let {
    token,
    ownerbot,
    urlFact,
    urlNewInfo,
    urlShedule,
    urlSupplyDemand
} = setting

let {
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

function sendMessageStart(ctx) {

    bot.telegram.sendMessage(ctx.chat.id, menu(ctx, ownerbot),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '❔Информация❔', callback_data: 'info' },
                    ],
                    [
                        { text: '📚Рабочие документы📚', callback_data: 'menu' }
                    ],
                    [
                        { text: '🚀Начать обслуживание🚀', callback_data: 'launchChecklist' }
                    ]
                ]
            },
            parse_mode: "Markdown",
            disable_web_page_preview: "true"
        })
}

function sendInfo(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, info(),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'FIBBEE🆘', url: 'https://fibbee.com/' },
                    ],
                    [
                        { text: 'Back!🔙', callback_data: 'start' }
                    ]
                ]
            },
            parse_mode: "Markdown"
        })
}

function sendMessageMenu(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, docs(ownerbot),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Новая информация⚠️', url: urlNewInfo },
                        { text: 'Рабочий график📆', url: urlShedule }
                    ],
                    [
                        { text: 'Заказы комплексов🧾', url: urlSupplyDemand },
                        { text: 'Факт📊', url: urlFact }
                    ],
                    [
                        { text: 'Back!🔙', callback_data: 'start' }
                    ]
                ]
            },
            parse_mode: "Markdown"
        })
}

function launchMessage(ctx) {
    const helper = 'Для начала обслуживания нужно выбрать маршрут'
    bot.telegram.sendMessage(ctx.chat.id, helper,
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

function routesInfoMessage(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, getMessageRoutes(), {
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


bot.action('routesInfo', (ctx) => {
    ctx.deleteMessage()
    routesInfoMessage(ctx)
})

bot.action('launchChecklist', (ctx) => {
    ctx.deleteMessage()
    launchMessage(ctx)
})

bot.action('info', (ctx) => {
    ctx.deleteMessage()
    sendInfo(ctx)
})

bot.action('start', (ctx) => {
    ctx.deleteMessage()
    sendMessageStart(ctx)
})

bot.action('route1', (ctx) => {
    ctx.deleteMessage()
    sendMessageStart(ctx)
})

bot.start((ctx) => {
    ctx.deleteMessage()
    sendMessageStart(ctx)
})

bot.action('menu', (ctx) => {
    ctx.deleteMessage()
    sendMessageMenu(ctx)
})

bot.command('menu', (ctx) => {
    ctx.deleteMessage()
    sendMessageStart(ctx)
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
            const link = await axios.get(`http://lolhuman.herokuapp.com/api/ytsearch?apikey=${key}&query=${messager}`)
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

// /* Music Fiture */

// bot.command('play', async (ctx) => {
//     let input = ctx.message.text
//     let inputArray = input.split(" ")
//     let message = "";

//     if (inputArray.length == 1) {
//         message = "Harap masukan judul, Contoh /play snowman"
//         ctx.reply(message)
//     } else {
//         sendSearch(ctx)
//         inputArray.shift();
//         messager = inputArray.join(" ")
//         const date = await axios.get(`https://api.vhtear.com/ytmp3?query=${messager}&apikey=${vhKey}`)
//         if (date.data.message) {
//             ctx.reply(`Music not found`)
//         } else {
//             const data = date.data.result
//             ctx.replyWithPhoto({ url: data.image }, {
//                 caption: `──────✿ 𝐏𝐥𝐚𝐲 ✿──────

// ❖ Title: ${data.title}
// ❖ DurationL ${data.duration}
// ❖ Size: ${data.size}
// ❖ Ext: ${data.ext}
// ❖ Id: ${data.id}
//             `})
//             if (Number(data.size.split(` MB`)[0]) >= 25.00) return ctx.reply(`Sorry the bot cannot send more than 25 MB!`)
//             sendLoading(ctx)
//             ctx.replyWithAudio({ url: data.mp3 })
//         }
//     }
// })

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
