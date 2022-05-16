const
    { Scenes } = require('telegraf'),
    point_scene = require('../scenes/point.scene');

const pointSupplyScene = (role, arr) => {
    switch (role) {
        case 'supply':
            return new Scenes.WizardScene('POINTS_SUPPLY_WIZARD_ID', ...point_scene(arr))

        case 'clean':
            return new Scenes.WizardScene('POINTS_CLEAN_WIZARD_ID', ...point_scene(arr))

    }

}

module.exports = pointSupplyScene