import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
} from "botbuilder";
import ApiService from "./api.js";

export const prettyJSON = (data: unknown) => JSON.stringify(data, null, 2);

export class TeamsBot extends TeamsActivityHandler {
  // public aiService = new AiService();
  public apiService = new ApiService();
  constructor() {
    super();
    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");
      console.log(prettyJSON(context));

      const { activity } = context;
      let text = activity.text;
      const userId = activity.from.aadObjectId;
      const botId = activity.recipient.id;
      const ts = activity.id; // We need epoch time.
      const tenantId = activity.conversation.tenantId;

      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      if (removedMentionText) {
        // Remove the line break
        text = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }
      const attachments = activity.attachments.filter(attachment => attachment.contentType === "application/vnd.microsoft.teams.file.download.info" ).map((attachment) => {return {fileName: attachment.name, fileType: `${attachment.content.fileType}`, fileUrl: `${attachment.content.downloadUrl}`}});
      const response = await this.apiService.query({
        question: text,
        userId,
        botId,
        attachments,
        tenantId,
      });
      console.log(`Response: ${response}`);
      console.log(prettyJSON(response));

      let reply = 'I am sorry, I did not understand that.'
      if (response && response.code === 200) {
        const responseSource = response.data.responseSource;
        if (['Pinecone', 'ChatGPT'].includes(responseSource)) {
          reply = `${response.data.data.text}\n\nSource: ${responseSource}`;
        } else if (responseSource === 'None') {
          if (response.data.data.event === 'FILE_UPLOAD_SUCCESS') {
            reply = 'We have saved your file(s) in our database.'
          }
        }
      }

      await context.sendActivity(reply);
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          // Send a welcome message.
          await context.sendActivity(
            `Welcome to the CloruptAI Bot! Ask me anything.`
          );
          break;
        }
      }
      await next();
    });
  }
}
