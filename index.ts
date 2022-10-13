import { Telegraf } from 'telegraf';
import { I18n } from "@grammyjs/i18n";
import updateLogger from 'telegraf-update-logger';
import chalk from 'chalk';
import path from 'path';
import LocalSession from 'telegraf-session-local';
import { primeSceneComposer } from './scenes/MainMenu';
import { SessionCtx } from './global';

require('dotenv').config();

const i18n = new I18n({
    defaultLanguage: 'ru',
    allowMissing: true,
    directory: path.resolve(__dirname, 'locales')
})

const token = process.env.TOKEN;

const bot = new Telegraf<SessionCtx>(token)

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
bot.use(primeSceneComposer)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))