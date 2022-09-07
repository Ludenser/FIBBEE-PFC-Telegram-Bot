/**
 * Функция для отбработки строки регулярным выржением. Если соответствие не найдено возвращает строку
 * @param {RegExp} re - regExp.
 * @param {String} str - string.
  */
const findMatch = (re, str) => {
    const regex = new RegExp(re, 'i')
    let s
    let m = regex.exec(str)
    if (m == null) {
        return str
    } else {
        s = m.map(match => {
            if (match !== null) {
                return match
            }
        })
    }

    return s.toString()
}

const replaceMatch = (stringFrom, stringTo) => {
    let re = /(?<=)@().+/gm
    const newString = stringFrom.replace(re, stringTo)
    return newString
}

module.exports = {
    findMatch,
    replaceMatch
}
