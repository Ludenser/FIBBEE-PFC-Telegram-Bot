import _ from 'lodash'

export const enum mainMenuComposerActions {
    INFO = 'info',
    DOCS = 'docs',
    DRIVERMENU = 'driverMenu',
}

export const enum routesInfoComposerActions {
    ROUTESINFO = 'routesInfo',
}

export const enum selectRouteComposerActions {
    SELECT_ROUTE = 'selectRoute',
    OPEN_ROUTE = 'openRoute',
    LEAVE_SCENE = 'leaveScene',
}

export const enum startComposerActions {
    START = 'start',
    UPDATE = 'update',
    RESTART= 'restart',
}

export const enum altModeComposerActions {
    MODE_CHANGE = 'modeChange',
    ACTION_SNIP = 'altRoute',
}

export const enum preventHandlersComposersActions {
    TEXT = 'text',
    PHOTO = 'photo',
}