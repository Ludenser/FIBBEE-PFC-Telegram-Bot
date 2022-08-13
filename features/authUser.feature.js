const _ = require('lodash');
const supplyTeam_ids = require('../lib/supplyTeam_ids');

module.exports = async (session) => {
    const userIdMatch = _(supplyTeam_ids)
        .find(['username', session.userName])
    session.user = userIdMatch
    if (session.user) {
        session.isAuthUser = true
    }
}