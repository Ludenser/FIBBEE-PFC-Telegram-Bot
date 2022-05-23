const { Telegraf } = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
const path = require('path');
const startComposer = require('./composers/start.composer');
const mainMenuComposer = require('./composers/mainMenu.composer');
const routesInfoComposer = require('./composers/routesInfo.composer');
const selectRouteComposer = require('./composers/selectRoute.composer');

require('dotenv').config();

const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    allowMissing: false, // Default true
    directory: path.resolve(__dirname, 'locales')
})
const token = process.env.TOKEN;

const bot = new Telegraf(token)

bot.context.all_tasksSupply = undefined
bot.context.all_tasksClean = undefined
bot.context.routeNumber = undefined
bot.context.team_id = undefined
bot.context.primeTaskSupply_id = undefined
bot.context.primeTaskClean_id = undefined

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

bot.use(i18n.middleware())
bot.use(startComposer)
bot.use(async (ctx, next) => {
    bot.use(selectRouteComposer(ctx))
    await next()
})
bot.use(mainMenuComposer)
bot.use(routesInfoComposer)

// bot.use(selectRouteComposer)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
