const { Attachment, Users } = require('../api/clickUpApi.service')
const userRegEx = require('../utils/regExp')

module.exports = async (ctx, task_id) => {

    const usernameQuery = userRegEx('(?<=@).+', ctx.update.message.text)
    const response = await Users.getUsers_id()

    function hasUserFrom(env) {
        return user => user.username === env;
    }

    const username = response.data.members.find(hasUserFrom(usernameQuery))
    await Attachment.createCommentAttachment(ctx, task_id, username.id)

}