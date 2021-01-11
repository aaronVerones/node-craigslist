module.exports.getDocumentInnerHTML = async () => {
  return await new Promise((resolve, reject) => {
    resolve(document.body.innerHTML)
  })
}