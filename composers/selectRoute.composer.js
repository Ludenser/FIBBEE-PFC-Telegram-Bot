const { Composer, Scenes, session } = require('telegraf'),
    routeScene = require('../wizards/route.wizard'),
    sendMessageError = require('../utils/sendMessageError'),
    { getTaskIdArrFromApi } = require('../features/getRoute.feature'),
    fs = require('fs'),
    setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
    {
        listIdSupply,
        listIdCleaning
    } = setting,
    pointSupplyScene = require('../wizards/point.wizard'),
    sendMessageInit = require('../keyboards/scenes/sendMessageInit.routeMenu');

module.exports = (ctx) => {
    const composer = new Composer();
    const stage = new Scenes.Stage([routeScene, pointSupplyScene(ctx.supplyArr_id)])

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
            console.log(ctx.scene)
            //  I have doubts about the correctness of this part.
            await ctx.deleteMessage()
            ctx.routeNumber = 1
            await sendMessageInit(ctx)
            await ctx.scene.enter('ROUTE_WIZARD_ID')  //temporary hardcode id, which ctx.scenes is guarantee has
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
