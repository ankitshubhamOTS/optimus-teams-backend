import axios from 'axios';
import config from './config.js';

class ApiService {
  public endpoint = config.apiEndpoint;
  async listFiles({
    userId,
    botId,
    tenantId,
  }: {
    userId: string;
    botId: string;
    tenantId: string;
  }) {
    try {
      const url = `${this.endpoint}/files/list`;
      const response = await axios.post(url, {
        userId,
        botId,
        tenantId,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  async deleteFile({
    userId,
    botId,
    tenantId,
    fileName,
  }: {
    userId: string;
    botId: string;
    tenantId: string;
    fileName: string;
  }) {
    try {
      const url = `${this.endpoint}/files/delete-one`;
      const response = await axios.post(url, {
        userId,
        botId,
        tenantId,
        fileName,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
  async deleteAllFiles({
    userId,
    botId,
    tenantId,
  }: {
    userId: string;
    botId: string;
    tenantId: string;
  }) {
    try {
      const url = `${this.endpoint}/files/delete-all`;
      const response = await axios.post(url, {
        userId,
        botId,
        tenantId,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async query({
    question,
    userId,
    botId,
    attachments,
    tenantId,
  }: {
    question: string;
    userId: string;
    botId: string;
    attachments: Array<{ fileName: string; fileType: string; fileUrl: string }>;
    tenantId: string;
  }) {
    try {
      const url = `${this.endpoint}/query`;
      const response = await axios.post(url, {
        question,
        userId,
        botId,
        attachments,
        tenantId,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

export default ApiService;
