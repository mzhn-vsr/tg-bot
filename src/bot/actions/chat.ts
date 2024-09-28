import { button, inlineKeyboard } from "telegraf/markup";
import { Action } from ".";
import { sendMessage } from "../../api/chat";
import { _ } from "../../locale";

const voteKeyboard = inlineKeyboard([
  button.callback("👍", "good"),
  button.callback("👎", "bad"),
]);

export const chatAction: Action = async (bot) => {
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

    ctx.reply(response, { reply_markup: voteKeyboard.reply_markup });
  });
};
