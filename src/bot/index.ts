import { Telegraf } from "telegraf";
import { delay } from "../util/time";
import registerActions from "./actions";

let tgBot: Telegraf | null = null;

export function setup(env: NodeJS.ProcessEnv) {
  const bot = new Telegraf(env.BOT_TOKEN);

  registerActions(bot);

  tgBot = bot;
  return bot;
}

export async function setupWebhook(env: NodeJS.ProcessEnv, bot: Telegraf) {
  await bot.telegram.deleteWebhook();
  await delay(500);
  return await bot.createWebhook({
    domain: env.WEBHOOK_DOMAIN,
    path: env.WEBHOOK_PATH,
    secret_token: env.WEBHOOK_SECRET,
  });
}

export function get() {
  if (!tgBot) throw new Error("Bot is not initialized");
  return tgBot;
}
