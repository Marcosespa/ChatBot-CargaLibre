import { addKeyword, EVENTS } from "@builderbot/bot";

const mainFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('👋 Hello welcome to this MARCVOCC *Chatbot*');

export { mainFlow };
