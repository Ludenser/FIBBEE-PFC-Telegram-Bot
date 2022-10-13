import moment from 'moment-timezone';

export default () => {
    moment.locale('ru')
    let weekday = moment().tz('Europe/Moscow').weekday()
    let hour = moment().tz('Europe/Moscow').hour()
    let saturday = false

    if (weekday === 5 && hour > 6) {
        saturday = true
    }
    if (weekday === 6 && hour > 6) {
        saturday = false
    }

    return saturday
}