import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Typography, Grid, Avatar, TextField, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/Warning';
import axios from "axios";
import { Chat } from '@component/pages/api/get-messages';
import ChatContent from './ChatContent';

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

function stringAvatar(name: string) { 
    if (!name[1]) return { children: `${name[0]}`}
    return {
      children: `${name[0]}${name[1]}`,
    };
}

const LiveChatWindow = ({user, conversations}: {user: any, conversations: any}) => {
    let Filter = require('bad-words');
    const filter = new Filter();

    const [open, setOpen] = useState<boolean>(false);
    const [currentChat, setCurrentChat] = useState<Chat>();
    const [message, setMessage] = useState<string>("");

    const [loadedMessages, setLoadedMessages] = useState<Chat[]>([]);
    const [pollingTime, setPollingTime] = useState<number>(5000);

    useEffect(() => {
        if (open) {
            setPollingTime(5000);
        }
    }, [open]);

    useEffect(() => {
        let isSubscribed = true; // Flag to indicate if the component is still subscribed
      
        const fetchData = async (payload: any) => {
          try {
            const response = await axios.post("/api/get-messages", payload);
            //console.log("data received: ", response.data);
            if (isSubscribed) {
                const newArr: Chat[] = [...response.data.conversations];
                console.log(newArr);
                setLoadedMessages(newArr);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        const pollData = async () => {
          while (isSubscribed) {
            await fetchData({ conversations, user_email: user.email });
            await new Promise((resolve) => setTimeout(resolve, pollingTime)); // Wait for 5 seconds before polling again
          }
        };
      
        pollData();
      
        return () => {
          // Cleanup function to unsubscribe when the component is unmounted
          isSubscribed = false;
        };
    }, []);

    useEffect(() => {
        //console.log("setting new loadedMessages...")
        console.log(loadedMessages);
    }, [loadedMessages])

    const submitMessage = async () => {
        if (message === "") {
            //console.log("nothing sent.")
            return;
        }
        const payload = {
            conversationId: currentChat?.conversationId,
            sender: user.username,
            content: filter.clean(message),
        }
        //console.log("message sent: ", payload);
        try {
            const response = await axios.post("/api/submit-chat-message", payload);
            //console.log("submit message response: ", response);
            setMessage("");
            try {

                const response = await axios.post("/api/get-messages", { conversations, user_email: user.email });
                //console.log("data received: ", response.data);
                const newArr: Chat[] = [...response.data.conversations];
                setLoadedMessages(newArr);
                } catch (error) {
                console.error("Error fetching data:", error);
            }
        } catch (error) {
            console.error(error);
        }
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
    {open && 
    <Box sx={style}>
        <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon />
        </IconButton>
        <Grid container>
            <Grid item xs={2} className="flex justify-center overflow-y-auto max-h-[450px] border-r border-gray-500">
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
            <Grid item xs={10} className="flex justify-center pl-1">
                <Grid container>
                    <Grid item xs={12} className="pl-4">
                        <Typography variant="h6">
                        Chat with {currentChat?.recipient_username ? currentChat.recipient_username : "someone!"}
                        <Tooltip title="Manual refresh currently, please reload page or press user's avatar to see latest chat" placement='top'>
                            <WarningIcon 
                                style={{ 
                                    color: 'red',
                                    marginBottom: '4px',
                                    marginLeft: '8px',
                                    fontSize: '1.5rem'
                                }}
                            />
                        </Tooltip>
                        </Typography>
                    </Grid>
                    <Grid container className="overflow-y-auto min-h-[350px] max-h-[350px] p-6">
                        <ChatContent user={user} currentChat={currentChat?.messages ?? []}/>
                        <div ref={messagesEndRef} />
                    </Grid>
                    <Grid item xs={11} className="mt-2 pl-6 pr-4">
                        <TextField
                            hiddenLabel
                            fullWidth
                            placeholder='Type your message...'
                            size="small"
                            multiline
                            rows={2}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1} className="pt-2 flex justify-items">
                        <IconButton onClick={submitMessage}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    }
    </div>
    );
};

export default LiveChatWindow;