import client from "../util/client";

export async function sendMessage(message: string) {
  console.log(message);
  const response = await client.post("/chat/invoke", {
    input: message,
    config: {},
    kwargs: {},
  });

  if (response.status != 200)
    throw new Error("Unable to make request", response.data);
  return response.data.output.content;
}
