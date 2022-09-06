const isSaturday = require("../utils/isSaturday")
/**
    * Настройка list_id тасков из кликапа. Их можно найти, нажав в контекстном меню таск-листа "Copy link". 
    * Нужное число - в конце скопированной ссылки.
    */
let routes = []

isSaturday() ? routes = ['204494505'] : routes = ['204381673', '204381766']
// const routes = ['204381673', '204381766'] - рабочие
// const routes = ['204392027', '204438842'] - тестовые
// const routes = ['204494505'] //суббота
module.exports = routes

//heroku ps:scale worker=0
