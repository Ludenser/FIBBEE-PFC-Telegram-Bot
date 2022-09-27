const discord_role_ids = {
  monitoring: '817407335617003531',
  service: '831822924012191764',
  daily: '842785948290514984',
  supply: '813463560843427921'
}

const menu_states = {
  MAIN: 'main',
  COMMENT: 'comment',
  PHOTO: 'photo',
  CUSTOM_FIELD: 'custom_field',
  SIDETASK: 'sideTask',
  SIDETASK_COMMENT: 'sideTask_comment',
  SIDETASK_PHOTO: 'sideTask_photo',
  INIT_SCENE: 'init_scene',
  DIVISION_SCENE: 'division_scene',
}

const actions = {
  START: 'start',
  UPDATE: 'update',
  PHOTO: 'photo',
  TEXT: 'text',
  OPEN_ROUTE: 'openRoute',
  CLOSE_ROUTE: 'closeRoute',
  LEAVE_SCENE: 'leaveScene',
  ROUTE: 'route',
  ENTER: 'enter',
  REENTER: 'reenter',
  BACK: 'back',

}

module.exports = { discord_role_ids, menu_states, actions }