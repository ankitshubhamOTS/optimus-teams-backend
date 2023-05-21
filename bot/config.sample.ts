const config = {
  botId: process.env.BOT_ID,
  botPassword: process.env.BOT_PASSWORD,
  openaiApiKey: 'sk-openai-api-key',
  pgHost: 'localhost',
  pgDatabase: 'postgres',
  pgUser: 'postgres',
  pgPassword: 'secret-password',
  pgPort: 5432,
  apiEndpoint: 'https://chatgpt.azurewebsites.net/api/v1',
};

export default config;
