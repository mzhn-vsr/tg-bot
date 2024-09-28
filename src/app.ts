import { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import * as bot from "./bot";
import logger from "./util/log";

export interface AppOptions extends FastifyServerOptions {}

// CLI arguments
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  logger.info("Fastify init phase start");

  const env = process.env;
  const tgBot = bot.setup(env);

  const webhook = await bot.setupWebhook(env, tgBot);

  // TODO: strange typing problems which doesn't match documentation
  // @ts-ignore
  fastify.post(`${env.LISTEN_PATH}`, webhook);

  logger.info("Fastify init phase end");
};

export default app;
export { app, options };
