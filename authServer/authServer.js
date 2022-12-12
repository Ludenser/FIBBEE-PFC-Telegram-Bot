const express = require('express')
const ClientOAuth2 = require('client-oauth2')
require('dotenv').config();
export default () => {
  const PORT = process.env.PORT || 5000
  const REDIRECT_AUTH_URL = process.env.REDIRECT_AUTH_URL
  const CLIENT_ID = process.env.CLIENT_ID
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const BOT_NAME = 'FibbiePfcBot'

  let clickupAuth = new ClientOAuth2({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    accessTokenUri: 'https://app.clickup.com/api/v2/oauth/token',
    authorizationUri: 'https://app.clickup.com/api',
    redirectUri: `${REDIRECT_AUTH_URL}`
  })

  const app = express()

  app.listen(PORT, () => {
    console.log(`Server is starting by ${PORT} port, with redirect to ${REDIRECT_AUTH_URL}`);
  })

  app.get('/auth', function (req, res) {
    let uri = clickupAuth.code.getUri()
    res.redirect(uri)
  })

  app.get('/auth/callback', function (req, res) {
    console.log(req.originalUrl);
    let reg = /(?<==).+/gm
    const tokenString = req.originalUrl.match(reg)
    console.log(tokenString[0]);
    res.redirect(`https://t.me/${BOT_NAME}?start=${tokenString[0]}`)
  })

}
