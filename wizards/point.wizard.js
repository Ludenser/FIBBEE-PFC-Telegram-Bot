const
    { Scenes } = require('telegraf'),
    point_scene = require('../scenes/point.scene');

const pointSupplyScene = (role, ctx) => {
    switch (role) {
        case 'supply':
            return new Scenes.WizardScene('POINTS_SUPPLY_WIZARD_ID', ...point_scene(ctx.all_tasksSupply))

        case 'clean':
            return new Scenes.WizardScene('POINTS_CLEAN_WIZARD_ID', ...point_scene(ctx.all_tasksClean))

    }

}

module.exports = pointSupplyScene