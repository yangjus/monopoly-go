import Pusher from "pusher";
import GlobalChat from "@component/../model/globalchat_schema";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: any, res: any) {
  const { message, sender, timestamp } = req.body;
  const chatMessage = await GlobalChat.create({
    sender: sender,
    content: message,
    timestamp: timestamp
  });
  if (!chatMessage) {
    return res.json({ message: 'message not saved in global chat.' })
  }

  const response = await pusher.trigger("global-chat", "message-event", {
    message,
    sender,
    timestamp
  });
  res.json({ message: response });
}