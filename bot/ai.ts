import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import config from "./config.js";
import Conversation, { ConversationI } from './models/sql/conversation.model.js';
import { Op } from 'sequelize';

class AiService {
  async preparePrompt({
    userId,
    botId,
  }: {
    userId: string;
    botId: string;
  }): Promise<ChatCompletionRequestMessage[]> {
    // Find all conversations where either the user or the bot is involved.
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          {
            fromId: userId,
            toId: botId,
          },
          {
            fromId: botId,
            toId: userId,
          },
        ],
      },
      order: [['ts', 'DESC']],
      limit: 8,
    }) as unknown as ConversationI[];

    const prompt = [] as ChatCompletionRequestMessage[];

    // Push the first message to the prompt array. It is an indication that the bot needs to be a helpful assistant.
    prompt.push({
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a helpful assistant.',
    });

    // Populate the prompt array with the user's and bot's messages. 
    conversations.reverse().map((conversation) => {
      prompt.push({
        role:
          conversation.fromId === botId
            ? ChatCompletionRequestMessageRoleEnum.Assistant
            : ChatCompletionRequestMessageRoleEnum.User,
        content: conversation.text,
      });
    });
    console.log('Prompt: ', prompt);
    return prompt;
  }

  async generateReply({
    userId,
    botId,
  }: {
    userId: string;
    botId: string;
  }): Promise<string | undefined> {
    try {
      const prompt = await this.preparePrompt({
        userId,
        botId,
      });
      const openai = new OpenAIApi(
        new Configuration({
          apiKey: config.openaiApiKey,
        })
      );
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: prompt,
      });

      return response.data.choices[0].message?.content;
    } catch (e) {
      return undefined;
    }
  }
}

export default AiService;
