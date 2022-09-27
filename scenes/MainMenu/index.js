const { Composer } = require("telegraf");
const mainMenuComposer = require("./composers/mainMenu.composer");
const routesInfoComposer = require("./composers/routesInfo.composer");
const startComposer = require("./composers/start.composer");

const primeSceneComposer = new Composer()

primeSceneComposer.use(
    startComposer,
    mainMenuComposer,
    routesInfoComposer
)

module.exports = primeSceneComposer