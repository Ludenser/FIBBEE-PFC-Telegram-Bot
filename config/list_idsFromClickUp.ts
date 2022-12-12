import isSaturday from "../utils/isSaturday"
/**
    * Настройка list_id тасков из кликапа. Их можно найти, нажав в контекстном меню таск-листа "Copy link". 
    * Нужное число - в конце скопированной ссылки.
    */
export let list_ids: string[] = []
list_ids = ['204381673', '204381766']
// isSaturday() ? list_ids = ['204494505'] : list_ids = ['204392027', '204438842']
// const routes = 204381673,204381766 - рабочие
// const routes = 204392027,204438842 - тестовые
// const routes = ['204494505'] //суббота

//heroku ps:scale worker=0
