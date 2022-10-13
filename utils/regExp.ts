/**
 * Функция для отбработки строки регулярным выржением. Если соответствие не найдено возвращает строку
 * @param {RegExp} re - regExp.
 * @param {String} str - string.
  */
export const findMatch = (re: RegExp, str: string) => {
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

export const replaceMatch = (stringFrom: string, stringTo: string) => {
    let re = /(?<=)@().+/gm
    const newString = stringFrom.replace(re, stringTo)
    return newString
}
