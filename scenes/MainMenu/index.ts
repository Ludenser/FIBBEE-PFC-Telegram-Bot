import { Composer } from "telegraf";
import { SessionCtx } from '../../global';
import mainMenuComposer from "./composers/mainMenu.composer";
import routesInfoComposer from "./composers/routesInfo.composer";
import { startComposer } from "./composers/start.composer";

export const primeSceneComposer = new Composer<SessionCtx>()

primeSceneComposer.use(
    startComposer,
    mainMenuComposer,
    routesInfoComposer
)
