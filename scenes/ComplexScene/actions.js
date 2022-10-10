const _ = require('lodash')

const preventHandlersComposersActions = {
    TEXT: 'text',
    PHOTO: 'photo',
}

const enterComposerActions = {
    ENTER: 'enter',
    REENTER: 'reenter',
}

const commentComposerActions = {
    UPL_COMMENT: 'upl_comment',
}

const exitComposerActions = {
    EXIT: 'exit',
}

const nextStepComposerActions = {
    NEXT_STEP: 'next_step',
}

const photoProcessComposerActions = {
    UPL_PHOTO: 'upl_photo',
}

const sideTaskComposerActions = {
    SIDETASK_MENU: 'sideTask_menu',
    SIDETASK_UPL_PHOTO: 'sideTask_upl_photo',
    SIDETASK_UPL_COMMENT: 'sideTask_upl_comment',
    SIDETASK_UPL_PHOTO_DONE: 'sideTask_upl_comment_done',
}
const customFieldsComposerActions = {
    CUSTOM_FIELD_EDIT_ACT: 'custom_field_edit_act',
    EDIT_CF: 'edit_CF',
    ERASE_CF: 'erase_CF',
}

const allComposerActions = _(preventHandlersComposersActions)
    .merge(
        enterComposerActions,
        commentComposerActions,
        customFieldsComposerActions,
        exitComposerActions,
        nextStepComposerActions,
        photoProcessComposerActions,
        sideTaskComposerActions
    )
    .value()

module.exports = {
    preventHandlersComposersActions,
    enterComposerActions,
    commentComposerActions,
    customFieldsComposerActions,
    exitComposerActions,
    nextStepComposerActions,
    photoProcessComposerActions,
    sideTaskComposerActions,
    allComposerActions
}