const express = require('express')
const ClientOAuth2 = require('client-oauth2')


require('dotenv').config();

let clickupAuth = new ClientOAuth2({
  clientId: 'PJERCGBWE7XIVE0XS8N1R6R0MQCV6TK2',
  clientSecret: 'H55Q9B18O1S97NKUKL65MO0B77ULPBOZP18KYFXVXR04596XS5X5YJJSO7B33VO7',
  accessTokenUri: 'https://app.clickup.com/api/v2/oauth/token',
  authorizationUri: 'https://app.clickup.com/api',
  redirectUri: 'https://telegrambottest.herokuapp.com/auth/callback'
})


const PORT = process.env.PORT || 3000
let app = express()
app.listen(PORT, () => {
  console.log(`Server is starting by ${PORT} port `);
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
  res.redirect(`https://t.me/pfctest_bot?start=${tokenString[0]}`)

})