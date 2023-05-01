import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
} from "botbuilder";
import AiService from "./ai.js";
import Conversation from "./models/sql/conversation.model.js";

export const prettyJSON = (data: unknown) => JSON.stringify(data, null, 2);

export class TeamsBot extends TeamsActivityHandler {

  constructor() {
    super();
    const api = new AiService();
    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");

      const { activity } = context;
      let text = activity.text;
      const fromId = activity.from.id;
      const toId = activity.recipient.id;
      const ts = activity.id; // We need epoch time.

      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      if (removedMentionText) {
        // Remove the line break
        text = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }
      // storing user-initiated conversation
      await Conversation.create({
        toId,
        fromId,
        text,
        ts,
      });

      const response = await api.generateReply({
        userId: fromId,
        botId: toId,
      });

      const resourceResponse = await context.sendActivity(response);

      // storing bot-initiated conversation
      await Conversation.create({
        toId: fromId,
        fromId: toId,
        text: response,
        ts: resourceResponse.id, // This is the timestamp of the bot's response.
      });


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
