import React, {useState} from 'react';
import UserDropdown from './UserDropdown';
import StarIcon from '@mui/icons-material/Star';
import {
    TableCell, 
    TableRow, 
    IconButton, 
    Box, 
    Collapse,
    Tooltip,
    Modal,
    Typography,
    Grid,
    TextField,
    Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TradingUser } from '@component/pages/trading';
import ChatIcon from '@mui/icons-material/Chat';
import { UserType } from '../../constants/users';
import axios from "axios";
import emailjs from "@emailjs/browser";

const style = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '40%',
    height: '40%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 4,
};

const mobileStyle = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '80%',
    height: '50%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 4,
};

const UserRow = ( {user, otherUser, isMobile} : {user: UserType, otherUser: TradingUser, isMobile: boolean} ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<{username: string, email: string}>({username: "", email: ""});
    const [message, setMessage] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const directMessage = async (email: string) => {
        setSubmitting(true);
        try {
            const payload: any = {
                participants_email: [user.email, email],
                sender: user.username,
                content: message
            }
            const response = await axios.post("/api/create-conversation", payload);
            if (response) {
                //send email through emailjs
                if (response.data.recipient_notification) {
                    const sendData: {from_username: string, to_username: string, to_email: string} = {
                        from_username: user.username,
                        to_username: response.data.to_username,
                        to_email: email
                    }
                    emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
                        process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID!, sendData, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
                }
                setSuccess(true);
            }
            //console.log(response);
        } catch (error) {
            console.error(error);
        }
        setMessage("");
        setSubmitting(false);
        return false;
    }

    const handleOpen = (user: string, email: string) => {
        setSelectedUser({username: user, email: email});
        setModalOpen(true);
    };
    
    const handleClose = () => {
        setModalOpen(false);
    };

    return (
    <>
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
            {`${otherUser.username}${isMobile ? ` (${otherUser.rank})` : ""}`}
            {otherUser.trusted &&
                <Tooltip title="Trusted Trader" placement='top'>
                    <StarIcon 
                        style={{ 
                        color: '#FFD60B',
                        marginBottom: '2px',
                        marginLeft: '4px' 
                        }}
                    />
                </Tooltip>
            }
            <IconButton onClick={() => handleOpen(otherUser.username, otherUser.email)} className="sm:ml-1">
                <Tooltip title="Direct Message" placement='top'>
                    <ChatIcon className="text-teal-500"/>
                </Tooltip>
            </IconButton>
            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={isMobile ? mobileStyle : style}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                    <Typography className="text-xl mb-4">
                        Send {selectedUser.username} a Direct Message:
                    </Typography>
                    <TextField
                        hiddenLabel
                        fullWidth
                        placeholder='Type your message...'
                        size="small"
                        multiline
                        rows={isMobile ? 6 : 4}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    {success &&
                        <p className="md:flex md:items-center text-green-500 mb-4 justify-center pt-2">
                            DM sent successfully! Please refresh page to see changes.
                        </p>
                    }
                    {!success &&
                        <div className="flex items-center justify-center pt-4">
                            <Button
                                onClick={() => directMessage(selectedUser.email)}
                                disabled={submitting}
                                className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            >
                                {submitting ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    }
                </Box>
            </Modal>
        </TableCell>
        {!isMobile && 
            <TableCell align="left">
                {otherUser.rank}
            </TableCell>
        }
        <TableCell align="right">
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
    </TableRow>

    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <UserDropdown user={otherUser} isMobile={isMobile}/>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
    </>
    );
}

export default UserRow;