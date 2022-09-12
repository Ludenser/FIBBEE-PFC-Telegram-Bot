const { Telegraf } = require('telegraf');
const { I18n } = require('@grammyjs/i18n');
const updateLogger = require('telegraf-update-logger');
const chalk = require('chalk');
const path = require('path');
const startComposer = require('./composers/start.composer');
const mainMenuComposer = require('./composers/mainMenu.composer');
const routesInfoComposer = require('./composers/routesInfo.composer');
const LocalSession = require('telegraf-session-local');
const express = require('express')
const ClientOAuth2 = require('client-oauth2')


require('dotenv').config();

let clickupAuth = new ClientOAuth2({
    clientId: 'PJERCGBWE7XIVE0XS8N1R6R0MQCV6TK2',
    clientSecret: 'H55Q9B18O1S97NKUKL65MO0B77ULPBOZP18KYFXVXR04596XS5X5YJJSO7B33VO7',
    accessTokenUri: 'https://app.clickup.com/api/v2/oauth/token',
    authorizationUri: 'https://app.clickup.com/api',
    redirectUri: 'http://localhost:3000/auth/callback'
})


const PORT = process.env.PORT || 3000
let app = express()
app.listen(PORT, () => {
    console.log(`Server is starting by ${PORT} port `);
})

app.use('/auth', function (req, res) {
    let uri = clickupAuth.code.getUri()
    res.redirect(uri)
})

app.use('/auth/callback', function (req, res) {

    let reg = /(?<==).+/gm
    const tokenString = req.originalUrl.match(reg)
    console.log(tokenString[0]);
    res.redirect(`https://t.me/pfctest_bot?start=${tokenString[0]}`)

})
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

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
