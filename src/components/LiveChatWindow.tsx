import React, { useState, useEffect } from 'react';
import { IconButton, Box, Typography, Grid, Avatar, TextField } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { Chat } from '@component/pages/api/get-messages';

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
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
  
    const firstInitial = firstName.substring(0, 1);
    const secondInitial = lastName ? lastName.substring(0, 1) : '';
  
    return {
      children: `${firstInitial}${secondInitial}`,
    };
}

const leftTriangle: string = "relative top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-teal-500 rotate-45";
const rightTriangle: string = "relative top-0 right-0 transform -translate-y-1/2 w-2 h-2 bg-orange-400 rotate-45";

interface Message {
    content: string,
    author: string,
    date: string
}

const LiveChatWindow = ({user, conversations}: {user: any, conversations: any}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentChat, setCurrentChat] = useState<Chat>();
    const [message, setMessage] = useState<string>("");

    const [messages, setMessages] = useState<Message[]>([]);
    const [loadedMessages, setLoadedMessages] = useState<Chat[]>([]);

    useEffect(() => {
        const dummy: Message[] = [
            {content: "yo hows it going", author: "Them", date: "Jan 11"},
            {content: "its going well how about you this is a test to expand", author: "You", date: "Jan 11"},
            {content: "nice me too", author: "Them", date: "Jan 11"},
            {content: "thats awesome man", author: "You", date: "Jan 11"},
            {content: "keep wrinting more text", author: "Them", date: "Jan 11"},
            {content: "yep", author: "You", date: "Jan 11"}
        ]
        setMessages(dummy);

        const fetchData = async (payload: any) => {
            try {
                const response = await axios.post("/api/get-messages", payload);
                console.log("data recieved: ", response.data)
                setLoadedMessages(response.data.conversations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData({conversations: conversations, user_email: user.email});
    }, []);

    const submitMessage = async () => {
        if (message === "") {
            console.log("nothing sent.")
            return;
        }
        const payload = {
            conversationId: currentChat?.conversationId,
            sender: user.username,
            content: message,
        }
        try {
            const response = await axios.post("/api/submit-chat-message", payload);
            console.log("submit message response: ", response);
            setMessage("");
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

    //const users: string[] = ['H', 'S', 'V', 'T', 'W', 'Z'];

    const changeUser = (id: string) => {

        function checkId(chat: Chat) {
            return chat.conversationId === id;
        }

        setCurrentChat(loadedMessages.find(checkId));
    }

    return (
    <div>
    {!open && <IconButton 
        onClick={handleOpen} 
        size="large"
        className="bg-blue-500 text-white"
    >
        <ChatIcon fontSize="large"/>
    </IconButton>
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
                        </Typography>
                    </Grid>
                    <Grid container className="overflow-y-auto max-h-[350px] p-6">
                        {messages.map((m: Message) => 
                            (m.author == "You" ? (
                                <Grid item xs={12} key={m.content}>
                                <div className="flex justify-end pt-1">
                                    <div className="text-sm text-gray-500 mt-1 mr-2">
                                        {m.date}
                                    </div>
                                    <div className="text-md">
                                        You
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="rounded bg-orange-400 text-white my-1 px-4 pb-1 w-4/5">
                                        <div className="flex justify-end">
                                            <div className={rightTriangle}></div>
                                        </div>
                                        {m.content}
                                    </div>
                                </div>
                                </Grid>
                            ) : (
                                <Grid item xs={12} key={m.content}>
                                <div className="flex pt-1">
                                    <div className="text-md">
                                        {m.author}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1 ml-2">
                                        {m.date}
                                    </div>
                                </div>
                                <div className="rounded bg-teal-500 text-white my-1 px-4 pb-1 w-4/5">
                                    <div className={leftTriangle}></div>
                                    {m.content}
                                </div>
                                </Grid>
                            ))
                        )}
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