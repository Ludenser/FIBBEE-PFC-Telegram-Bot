const { Telegraf, Context } = require('telegraf');
const { I18n } = require("@grammyjs/i18n")
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
const path = require('path');
const LocalSession = require('telegraf-session-local');
const startComposer = require('./scenes/MainMenu/composers/start.composer');
const mainMenuComposer = require('./scenes/MainMenu/composers/mainMenu.composer');
const routesInfoComposer = require('./scenes/MainMenu/composers/routesInfo.composer');

require('dotenv').config();

const i18n = new I18n({
    defaultLanguage: 'ru',
    allowMissing: true,
    directory: path.resolve(__dirname, 'locales')
})

const token = process.env.TOKEN;

const bot = new Telegraf(token)

bot.use((new LocalSession({ database: 'session_db.json' })).middleware())

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
/* tslint:disable-next-line */
bot.use(i18n.middleware())
bot.use(startComposer)
bot.use(mainMenuComposer)
bot.use(routesInfoComposer)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))