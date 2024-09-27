import { Action } from ".";
import { sendMessage } from "../../api/chat";
import { _ } from "../../locale";

export const baseAction: Action = async (bot) => {
  bot.start(async (ctx) => await ctx.replyWithMarkdownV2(_("message_welcome")));

  bot.on("message", async (ctx) => {
    if (ctx.text == undefined || ctx.text == "") {
      ctx.replyWithMarkdownV2(_("message_unknown_payload"));
      return;
    }

    let response;
    try {
      await ctx.sendChatAction("typing");
      response = await sendMessage(ctx.text);
    } catch (e) {
      ctx.reply(_("message_server_error"));
      console.error(e);
      return;
    }

    ctx.reply(response);
  });
};
