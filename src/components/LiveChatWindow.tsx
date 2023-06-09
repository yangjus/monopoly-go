import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Typography, Grid, Avatar, TextField, Tooltip, Modal } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Pusher from "pusher-js";
import { Chat } from '@component/pages/api/get-messages';
import ChatContent from './ChatContent';
import DeleteIcon from '@mui/icons-material/Delete';

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
            content: filter.clean(message),
        }
        try {
            await axios.post("/api/submit-chat-message", payload);
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

    return (
    <div>
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
                <Grid item xs={3} sm={2} className="flex justify-center overflow-y-auto max-h-[65vh] sm:max-h-[450px] border-r border-gray-500">
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
                            </Typography>
                            <IconButton onClick={openPopup}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid container className="overflow-y-auto min-h-[60vh] sm:min-h-[330px] max-h-[60vh] sm:max-h-[330px] p-1 mt-2 sm:mt-0 sm:p-6">
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