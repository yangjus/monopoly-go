import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: any, res: any) {
  const { message, sender, timestamp } = req.body;
  const response = await pusher.trigger("global-chat", "message-event", {
    message,
    sender,
    timestamp
  });
  res.json({ message: response });
}