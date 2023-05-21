import axios from 'axios';
import config from './config.js';

class ApiService {
  public endpoint = config.apiEndpoint;
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
    attachments: Array<{ fileName: string; fileType: string; fileUrl: string; }>;
    tenantId: string;
  }) {
    try {
      // Make an api call to the backend to generate a reply.
      // POST /api/generate-reply
      // Body: { userId, botId }
      const url = `${this.endpoint}/query`;
      console.log(`Calling ${url}`);
      console.log({
        question,
        userId,
        botId,
        attachments,
        tenantId,
      });
      const response = await axios.post(
        url,
        {
          question,
          userId,
          botId,
          attachments,
          tenantId,
        }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }
}

export default ApiService;
