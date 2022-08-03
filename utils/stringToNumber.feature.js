module.exports = (list_ids) => {
  let listIdArray = []

  list_ids.forEach((el) => {
    listIdArray.push(Number(el))
    return listIdArray
  })

  return listIdArray

}
