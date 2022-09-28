const axios = require('axios');
require('dotenv').config();
class Token {
  async getToken(code) {
    const response = await axios.post('https://api.clickup.com/api/v2/oauth/token',
      {},
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: code
        }
      }

    )
    return response.data
  }
}

module.exports = Token