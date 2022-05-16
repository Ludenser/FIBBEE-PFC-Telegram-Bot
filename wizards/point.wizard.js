const
    { Scenes } = require('telegraf'),
    point_scene = require('../scenes/point.scene');


// const arr = ['2bukw4c', '2bukw5j', '2bukw66']

const pointSupplyScene = (arr) => {
    return new Scenes.WizardScene('POINTS_SUPPLY_WIZARD_ID', ...point_scene(arr))
}

module.exports = pointSupplyScene