const { Composer, Scenes, session } = require('telegraf');
const routeScene = require('../wizards/route.wizard');
const sendMessageError = require('../utils/sendMessageError');
const { getTaskIdArrFromApi } = require('../features/getRoute.feature');
const pointScene = require('../wizards/point.wizard');
const sendMessageInit = require('../keyboards/scenes/sendMessageInit.routeMenu');

module.exports = (ctx) => {

    const composer = new Composer();

    const stage = new Scenes.Stage([routeScene, pointScene('supply', ctx), pointScene('clean', ctx)])

    composer.use(session())
    composer.use(stage.middleware())


    // const arr = await getTaskIdArrFromApi(listIdSupply)
    // getTaskIdArrFromApi(listIdSupply).then((arr) => {
    //     const scenes = arr.map((value) => {
    //         return point_scene(value)
    //     })
    //     return scenes
    // })
    //     .then((scenes) => {
    //         stage = new Scenes.Stage(scenes)
    //         composer.use(session()).use(stage.middleware())
    //     })  


    composer.action('route1', async (ctx) => {
        try {
            await ctx.deleteMessage()
            ctx.routeNumber = 1
            await sendMessageInit(ctx)
            await ctx.scene.enter('ROUTE_WIZARD_ID')
        } catch (e) {
            sendMessageError(ctx, e)
        }

    })

    composer.action('route2', async (ctx) => {
        try {
            await ctx.deleteMessage()
            ctx.routeNumber = 2
            await sendMessageInit(ctx)
            await ctx.scene.enter('ROUTE_WIZARD_ID')
        } catch (e) {
            sendMessageError(ctx, e)
        }

    })

    return composer
}
