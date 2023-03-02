import axios from 'axios';
import FormData from 'form-data';
import { createReadStream } from 'fs';
import { LeanIXMTMAuth } from './mtm-auth.js';

export class VSMDiscovery extends LeanIXMTMAuth {
  constructor (host, region, apiToken) {
    super(host, apiToken);
    this.region = region;
    this.discoveryEndpoint = `https://${this.region}-vsm.leanix.net/services/vsm/discovery/v1/service`;
  }

  /**
   * Calls the Create or Update Service endpoint of the Discovery API
   * @param {Object} param0
   * @param {string} param0.id The id of this service from the source system.
   * @param {string} param0.sourceType The name of the source sending this request.
   * @param {string} param0.sourceInstance Which instance of the source is sending the request. e.g. A GitHub Organization name.
   * @param {string} param0.name The name of this service.
   * @param {string?} param0.description An optional description of this service.
   * @param {Object?} param0.data An optional key-value pair object of additional data to store in VSM.
   * @param {string?} param0.bomFileLocation The location of the generated SBOM file, including the file name.
   */
  async serviceDiscovery ({ id, sourceType, sourceInstance, name, description, data, bomFileLocation }) {
    if (!this.hasBeenInited) {
      await this.login();
      this.hasBeenInited = true;
    }

    const formData = new FormData();

    formData.append('id', id);
    formData.append('sourceType', sourceType);
    formData.append('sourceInstance', sourceInstance);
    formData.append('name', name);
    if (description) formData.append('description', description);
    if (data) formData.append('data', JSON.stringify(data));

    if (bomFileLocation) {
      const bomStream = createReadStream(bomFileLocation);
      formData.append('bom', bomStream, bomFileLocation);
    }

    try {
      await axios.post(this.discoveryEndpoint, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.accessToken}`
        }
      });
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
      throw new Error('Failed to send service to LeanIX VSM');
    }
  }
}
