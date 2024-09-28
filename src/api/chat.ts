import client from "../util/client";

/** Send message to external AI api
 *
 * @throws `Error` when request failed on any reason
 */
export async function sendMessage(message: string) {
  const response = await client.post("/predict", {
    question: message,
  });

  if (response.status != 200)
    throw new Error("Unable to make request", response.data);
  return response.data.answer;
}
