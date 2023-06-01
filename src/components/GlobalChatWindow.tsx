import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Typography, Grid, TextField, Tooltip } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import Pusher from "pusher-js";
import { sentMessage } from '@component/pages/api/get-messages';
import ChatContent from './ChatContent';
import moment from 'moment';

const style = {
    position: 'fixed',
    bottom: '20px',
    left: '80px',
    width: '500px',
    height: '500px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    borderWidth: '4px',
    borderColor: 'teal'
};

const GlobalChatWindow = ({user}: {user: any}) => {

    let Filter = require('bad-words');
    const filter = new Filter();

    const [open, setOpen] = useState<boolean>(false);
    const [currentChat, setCurrentChat] = useState<sentMessage[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {

        const fetchData = async () => {
            const recentMessages = await axios.post("/api/get-global-chat");
            setCurrentChat(recentMessages.data.conversations);
        }

        fetchData();

        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
    
        const channel = pusher.subscribe("global-chat");
    
        channel.bind("message-event", function (data: any) {
          //console.log(data);
          setCurrentChat((prevState: sentMessage[]) => [
            ...prevState,
            { sender: data.sender, content: data.message, timestamp: data.timestamp },
          ]);
        });
    
        return () => {
          pusher.unsubscribe("global-chat");
        };
      }, []);

    const submitMessage = async () => {
        if (message == "") {
            return;
        }
        const currentDate: moment.Moment = moment();
        await axios.post("/api/global-chat", { 
            message: filter.clean(message), 
            sender: user.username,
            timestamp: currentDate
        });
        setMessage("");
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          submitMessage();
        }
      };

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
    <Tooltip title="Global Chat" placement='top'>
        <IconButton 
            onClick={handleOpen} 
            size="large"
            className="bg-blue-500"
        >
            <PublicIcon fontSize="large" className="text-white"/>
        </IconButton>
    </Tooltip>
    }
    {open && 
    <Box sx={style}>
        <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon />
        </IconButton>
        <Grid container>
            <Grid item xs={12} className="flex justify-center pl-1">
                <Grid container>
                    <Grid item xs={12} className="pl-4">
                        <Typography variant="h6">
                            Global Chat
                            <Tooltip title="Past week of chat history" placement='top'>
                            <InfoIcon 
                                style={{ 
                                    color: 'teal',
                                    marginBottom: '4px',
                                    marginLeft: '8px',
                                    fontSize: '1.5rem'
                                }}
                            />
                            </Tooltip>
                        </Typography>
                    </Grid>
                    <Grid container className="overflow-y-auto min-h-[350px] max-h-[350px] p-6">
                        <ChatContent user={user} currentChat={currentChat}/>
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
                            onKeyDown={handleKeyDown}
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

export default GlobalChatWindow;