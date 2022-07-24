const { Scenes } = require('telegraf');
const complex_scene = require('../scenes/complex.scene');

/**
  * Сцена инициализации назначенного роута.
  */
const complexScene = (role, ctx) => {
    switch (role) {
        case '1':
            return new Scenes.WizardScene('ROUTE_1_WIZARD_ID', ...complex_scene(ctx.all_tasksSupply))

        case '2':
            return new Scenes.WizardScene('ROUTE_2_WIZARD_ID', ...complex_scene(ctx.all_tasksClean))

    }

}

module.exports = complexScene