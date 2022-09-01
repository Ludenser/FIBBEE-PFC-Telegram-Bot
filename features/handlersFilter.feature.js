const filter = (ctx, next, predicate) => predicate && next()

module.exports = filter