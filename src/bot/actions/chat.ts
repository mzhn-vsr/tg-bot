import { Context } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { Action } from ".";
import { sendMessage } from "../../api/chat";
import { _ } from "../../locale";
import logger from "../../util/log";

const trySendMessage = async (text: string, ctx: Context) => {
  await ctx.sendChatAction("typing");
  const response = await sendMessage(text);

  const voteKeyboard = inlineKeyboard([
    button.callback("👍", `good_${response.feedbackId}`),
    button.callback("👎", `bad_${response.feedbackId}`),
  ]);

  ctx.reply(response.answer, {
    reply_markup: voteKeyboard.reply_markup,
    reply_parameters: { message_id: ctx.msgId },
  });
};

export const chatAction: Action = async (bot) => {
  bot.on("message", async (ctx) => {
    if (ctx.text == undefined || ctx.text == "") {
      ctx.replyWithMarkdownV2(_("message_unknown_payload"));
      return;
    }

    try {
      await trySendMessage(ctx.text, ctx);
    } catch (e) {
      ctx.reply(_("message_server_error"));
      logger.error(e);
    }
  });
};
