const _ = require('lodash')

const mainMenuComposerActions = {
    INFO: 'info',
    DOCS: 'docs',
    DRIVERMENU: 'driverMenu',
}

const routesInfoComposerActions = {
    ROUTESINFO: 'routesInfo',
}

const selectRouteComposerActions = {
    ROUTE: 'route',
}

const startComposerActions = {
    START: 'start',
    UPDATE: 'update',
}

const altModeComposerActions = {
    MODE_CHANGE: 'modeChange',
    ACTION_SNIP: 'altRoute',
}

const preventHandlersComposersActions = {
    TEXT: 'text',
    PHOTO: 'photo',
}

const allComposerActions = _(preventHandlersComposersActions)
    .merge(preventHandlersComposersActions,
        altModeComposerActions,
        startComposerActions,
        selectRouteComposerActions,
        routesInfoComposerActions,
        mainMenuComposerActions)
    .value()

module.exports = {
    mainMenuComposerActions,
    routesInfoComposerActions,
    selectRouteComposerActions,
    startComposerActions,
    altModeComposerActions,
    preventHandlersComposersActions,
    allComposerActions
}