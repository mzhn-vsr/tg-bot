import { Telegraf } from "telegraf";
import { baseAction } from "./base";
import { chatAction } from "./chat";

export type Action = (bot: Telegraf) => Promise<void>;

const actions: Action[] = [baseAction, chatAction];

export default function registerActions(bot: Telegraf) {
  actions.forEach((cb) => cb(bot));
}
