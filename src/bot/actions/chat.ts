import { Context } from "telegraf";
import { button, inlineKeyboard } from "telegraf/markup";
import { Action } from ".";
import { getStats, sendMessage, sendStatus } from "../../api/chat";
import { _ } from "../../locale";
import logger from "../../util/log";

const trySendMessage = async (text: string, ctx: Context) => {
  await ctx.sendChatAction("typing");
  const response = await sendMessage(text);

  const voteKeyboard = inlineKeyboard([
    button.callback("👍", `good_${response.feedbackId}`),
    button.callback("👎", `bad_${response.feedbackId}`),
  ]);

  ctx.reply(response.answer, { reply_markup: voteKeyboard.reply_markup });
};

export const chatAction: Action = async (bot) => {
  bot.command("stats", async (ctx) => {
    try {
      const response = await getStats();
      ctx.reply(
        _("message_stats", {
          total: response.total,
          good: response.positive,
          bad: response.negative,
        }),
        { parse_mode: "HTML" }
      );
    } catch (e) {
      logger.error(e);
      ctx.reply(_("message_server_error"));
    }
  });

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

  bot.on("callback_query", async (ctx) => {
    // @ts-ignore
    const [status, id] = ctx.callbackQuery.data.split("_");
    const isGood = status === "good";

    const statusString = isGood ? "хорошую" : "плохую";

    try {
      await sendStatus(id, isGood);
    } catch (e) {
      logger.error(e);
    }

    ctx.editMessageText(
      ctx.text + `\n\n` + _("message_vote", { vote: statusString }),
      { parse_mode: "HTML", reply_markup: inlineKeyboard([]).reply_markup }
    );
  });
};
