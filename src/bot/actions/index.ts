import { Telegraf } from "telegraf";
import { baseAction } from "./base";
import { chatAction } from "./chat";
import { statsAction } from "./stats";

export type Action = (bot: Telegraf) => Promise<void>;

const actions: Action[] = [baseAction, statsAction, chatAction];

export default function registerActions(bot: Telegraf) {
  actions.forEach((cb) => cb(bot));
}
