import axios from 'axios';
require('dotenv').config();
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export interface Response {
  access_token: string
}

export class Token {
  async getToken(code: string) {
    
    const response = await axios.post<Response>('https://api.clickup.com/api/v2/oauth/token',
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

