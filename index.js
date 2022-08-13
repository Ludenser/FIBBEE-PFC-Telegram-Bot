const { Telegraf } = require('telegraf');
const { I18n } = require('@grammyjs/i18n');
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
const path = require('path');
const startComposer = require('./composers/start.composer');
const mainMenuComposer = require('./composers/mainMenu.composer');
const routesInfoComposer = require('./composers/routesInfo.composer');
const selectRouteComposer = require('./composers/selectRoute.composer');
const LocalSession = require('telegraf-session-local');
const totalSceneInitComposer = require('./composers/totalSceneInit.composer');

require('dotenv').config();

const i18n = new I18n({
    defaultLanguage: 'ru',
    allowMissing: false, // Default true
    directory: path.resolve(__dirname, 'locales')
})
const token = process.env.TOKEN;

const bot = new Telegraf(token)

bot.use((new LocalSession({ database: 'session_db.json' })).middleware())

bot.context.main_timer_id = undefined

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

bot.use(i18n.middleware())
bot.use(startComposer)
bot.use(mainMenuComposer)
bot.use(routesInfoComposer)
// bot.use(async (ctx, next) => {
//     bot.use(totalSceneInitComposer(ctx))
//     await next()
// })
// bot.use(async (ctx, next) => {
//     bot.use(...selectRouteComposer(ctx))
//     await next()
// })

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
