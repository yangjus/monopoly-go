import React, { useState, useEffect, useRef } from 'react';
import { IconButton, Box, Typography, Grid, TextField, Tooltip, Modal } from '@mui/material';
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

const GlobalChatWindow = ({user, isMobile, windowHeight}: {user: any, isMobile: boolean, windowHeight: number}) => {

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
    <Modal open={open} onClose={handleClose}>
        <Box sx={isMobile ? mobileStyle : style}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                <CloseIcon fontSize="large"/>
            </IconButton>
            <Grid container>
                <Grid item xs={12} className="flex justify-center pl-1">
                    <Grid container className="flex justify-center">
                        <Grid item xs={12} className="pl-4">
                            <Typography className="text-2xl mb-2">
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
                        <Grid container className={
                           `overflow-y-auto min-h-[60vh] max-h-[60vh] sm:min-h-[300px] sm:max-h-[300px] p-4 m-2`
                        }>
                            <ChatContent user={user} currentChat={currentChat}/>
                            <div ref={messagesEndRef} />
                        </Grid>
                        <Grid item xs={12} sm={10} className="sm:mt-2 sm:pl-6 sm:pr-4">
                            <TextField
                                hiddenLabel
                                fullWidth
                                placeholder='Type your message...'
                                size="small"
                                multiline
                                rows={isMobile ? 3 : 2}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Grid>
                        {isMobile && 
                            <Grid item className="pt-2 flex items-center justify-center">
                                    <button 
                                        type="submit"
                                        className="shadow bg-teal-500 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Send
                                    </button>
                            </Grid>
                        }
                        {!isMobile && 
                            <Grid item className="pt-2 flex justify-items">
                                <IconButton onClick={submitMessage}>
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </Modal>
    </div>
    );
};

export default GlobalChatWindow;