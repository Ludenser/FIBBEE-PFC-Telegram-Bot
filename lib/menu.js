const menu = (ctx, ownerbot) => {
    return `●▬▬▬▬▬ஜFIBBEEஜ▬▬▬▬▬●

❖ NameBot : *${ctx.botInfo.first_name}*
❖ Version : \`0.1.0\`
❖ Owner : *${ownerbot}*
`}
exports.menu = menu

const info = () => {
    return `●▬▬▬▬ஜInfoஜ▬▬▬▬●

This is corporate chat-bot by Foodtronics team
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░███████████████████████████░░
░░██───██─██───█───█───█───██░░
░░██─████─██─█─█─█─█─███─████░░
░░██───██─██───█───█───█───██░░
░░██─████─██─█─█─█─█─███─████░░
░░██─████─██───█───█───█───██░░
░░███████████████████████████░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
ㅤㅤㅤㅤㅤㅤㅤㅤ⌤⌤⌤⌤⌤
`}
exports.info = info

const routesInfo = () => {
    return `●▬▬▬▬ஜRoutesInfoஜ▬▬▬▬●
    Роут 1: 1.Сколково, 2. Орбион, 3. Ламода, 4. Авиапарк, 5. Мозайка;
    Роут 2: 1. АФК, 2. Пятницкая, 3. Сибур, 4. IQ Квартал
`}
exports.routesInfo = routesInfo

const docs = () => {
    return `●▬▬▬ஜМенюஜ▬▬▬●
Нажми одну из кнопок снизу:`
}
exports.docs = docs

const helper = () => {
    return 'Для начала обслуживания нужно выбрать маршрут'
}

exports.helper = helper