import axios from 'axios';

export class LeanIXMTMAuth {
  constructor (host, apiToken) {
    this.host = host;
    this.apiToken = apiToken;
    this.hasBeenInited = false;
  }

  async login () {
    try {
      const loginResponse = await axios.post(`https://${this.host}.leanix.net/services/mtm/v1/oauth2/token`, {
        grant_type: 'client_credentials'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: 'apitoken',
          password: this.apiToken
        }
      });

      this.accessToken = loginResponse.data.access_token;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      throw new Error('Failed to Authenticate to LeanIX MTM');
    }
  }
}
