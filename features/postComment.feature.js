const PostAttachmentsService = require('../api/clickupApiAttachments.service')
const GetUsers = require('../api/clickupApiUsers.service')
const userRegEx = require('../utils/regExp')

module.exports = async (ctx, task_id) => {

    const usernameQuery = userRegEx('(?<=@).+', ctx.update.message.text)
    const response = await GetUsers.getUsers_id()

    function hasUserFrom(env) {
        return user => user.username === env;
    }

    const username = response.data.members.find(hasUserFrom(usernameQuery))
    await PostAttachmentsService.createCommentAttachment(ctx, task_id, username.id)

}