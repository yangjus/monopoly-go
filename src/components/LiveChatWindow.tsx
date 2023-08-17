import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Typography, Grid, Avatar, TextField, Tooltip, Modal, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Pusher from "pusher-js";
import { Chat } from '@component/pages/api/get-messages';
import ChatContent from './ChatContent';
import DeleteIcon from '@mui/icons-material/Delete';
import emailjs from "@emailjs/browser";

const style = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '500px',
    height: '500px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    borderWidth: '4px',
    borderColor: 'teal'
};

const mobileStyle = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '90%',
    height: '95%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 2,
};

const deleteStyle = {
    position: 'fixed',
    bottom: '200px',
    left: '180px',
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    borderWidth: '4px',
    borderColor: 'teal'
};

const mobileDeleteStyle = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '50%',
    height: '20%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 2,
};

function stringAvatar(name: string) { 
    if (!name[1]) return { children: `${name[0]}`}
    return {
      children: `${name[0]}${name[1]}`,
    };
}

const LiveChatWindow = ({user, conversations, isMobile}: {user: any, conversations: any, isMobile: boolean}) => {
    let Filter = require('bad-words');
    const filter = new Filter();

    const [open, setOpen] = useState<boolean>(false);
    const [currentChat, setCurrentChat] = useState<Chat>();
    const [message, setMessage] = useState<string>("");
    const [loadedMessages, setLoadedMessages] = useState<Chat[]>([]);
    const [toggleDelete, setToggleDelete] = useState<boolean>(false);

    useEffect(() => {

        const fetchData = async() => {
            try {
              const response = await axios.post("/api/get-messages", { conversations, user_email: user.email });
              //console.log("data received: ", response.data);
              setLoadedMessages(response.data.conversations);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
      
        const channel = pusher.subscribe("direct-chat");
      
        channel.bind("message-event", function (data: any) {
            //console.log(data); {conversationId, sender, content, timestamp}
            //matching data send from pusher to add to the messages: sentMessages[] array
            //based on the conversationID
            setLoadedMessages((prevLoadedMessages: Chat[]) => {
                return prevLoadedMessages.map((chat: Chat) =>
                  chat.conversationId === data.payload.conversationId ? {
                    ...chat,
                    messages: [
                      ...chat.messages,
                      {
                        sender: data.payload.sender,
                        content: data.payload.content,
                        timestamp: data.payload.timestamp,
                        _id: "temp_id"
                      }
                    ]
                  } : chat
                );
            });
        });
      
        return () => {
            pusher.unsubscribe("direct-chat");
        };
    }, [conversations, user.email]);

    const submitMessage = async () => {
        if (message === "") {
            return;
        }
        const payload = {
            conversationId: currentChat?.conversationId,
            sender: user.username,
            content: filter.clean(message)
        }
        try {
            const response: any = await axios.post("/api/submit-chat-message", payload);
            //send email through emailjs
            if (response.data.recipient_notification) {
                const sendData: {from_username: string, to_username: string, to_email: string} = {
                    from_username: user.username,
                    to_username: response.data.to_username,
                    to_email: response.data.to_email
                }
                emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
                    process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID!, sendData, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
            }
        } catch (error) {
            console.error(error);
        }
        setMessage("");
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeUser = (id: string) => {

        function checkId(chat: Chat) {
            return chat.conversationId === id;
        }

        setCurrentChat(loadedMessages.find(checkId));
    }

    const messagesEndRef = useRef<any>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [currentChat, open]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          submitMessage();
        }
    };

    const openPopup = () => {
        setToggleDelete(true);
    }

    const closePopup = () => {
        setToggleDelete(false);
    }

    const deleteConversation = async (deletedChat: Chat) => {

        const prevLoadedMessages: Chat[] = loadedMessages.filter(
            (chat: Chat) => deletedChat.conversationId !== chat.conversationId
        )
        setLoadedMessages(prevLoadedMessages);
        setCurrentChat(undefined);
        setToggleDelete(false);

        try {
            await axios.post("/api/delete-chat", {id: deletedChat.conversationId, email: user.email});
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <div>
    <Modal open={toggleDelete} onClose={closePopup}>
        <Box sx={isMobile ? mobileDeleteStyle : deleteStyle} className="flex items-center justify-center">
            <Grid container>
                <Grid item xs={12}>
                    <Typography>
                        Confirm Deletion of Conversation? All Messages Will Be Deleted.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => deleteConversation(currentChat!)} className='text-white bg-blue-400 hover:bg-blue-600'>
                        Yes
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={closePopup} className='text-white bg-red-400 hover:bg-red-600'>
                        No
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Modal>
    {!open && 
    <Tooltip title="Direct Messages" placement='top'>
        <IconButton 
            onClick={handleOpen} 
            size="large"
            className="bg-blue-500"
        >
            <ChatIcon fontSize="large" className="text-white"/>
        </IconButton>
    </Tooltip>
    }
    <Modal open={open} onClose={handleClose}>
        <Box sx={isMobile ? mobileStyle : style}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                <CloseIcon fontSize="large"/>
            </IconButton>
            <Grid container>
                <Grid item xs={3} sm={2} className="flex justify-center overflow-y-auto max-h-[65vh] sm:max-h-[350px] border-r border-gray-500">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Users
                            </Typography>
                        </Grid>
                        {loadedMessages.map((chat: Chat) => 
                            <Grid item xs={12} key={chat.conversationId} className="my-1">
                                <IconButton onClick={() => changeUser(chat.conversationId)}>
                                    <Avatar {...stringAvatar(chat.recipient_username)} />
                                </IconButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={9} sm={10} className="flex justify-center pl-1">
                    <Grid container>
                        <Grid item xs={12} className="pl-4 flex justify items-center">
                            <Typography variant="h6">
                            Chat with {currentChat?.recipient_username ? currentChat.recipient_username : "someone!"}
                            {currentChat && 
                            <IconButton onClick={openPopup}>
                                <DeleteIcon />
                            </IconButton>}
                            </Typography>
                        </Grid>
                        <Grid container className="overflow-y-auto min-h-[60vh] sm:min-h-[250px] max-h-[60vh] sm:max-h-[250px] p-1 mt-2 sm:mt-0 sm:p-6">
                            <ChatContent user={user} currentChat={currentChat?.messages ?? []}/>
                            <div ref={messagesEndRef} />
                        </Grid>
                        <Grid item xs={12} className="flex justify-center pl-2 sm:pl-0">
                            Press user&apos;s icon to see the latest message
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10} className="mt-2 pl-2 sm:pl-6 sm:pr-4">
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder='Type your message...'
                                size="small"
                                multiline
                                rows={2}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                <Grid item xs={2} className="pt-2 flex justify-items">
                    <IconButton onClick={submitMessage}>
                        <SendIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    </Modal>
    </div>
    );
};

export default LiveChatWindow;