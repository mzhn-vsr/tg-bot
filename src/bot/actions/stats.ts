import { inlineKeyboard } from "telegraf/markup";
import { Action } from ".";
import { getStats, sendStatus } from "../../api/chat";
import { _ } from "../../locale";
import logger from "../../util/log";

export const statsAction: Action = async (bot) => {
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
