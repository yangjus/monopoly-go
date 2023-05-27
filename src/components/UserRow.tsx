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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TradingUser } from '@component/pages/trading';
import ChatIcon from '@mui/icons-material/Chat';
import { UserType } from '../../constants/users';
import axios from "axios";

const UserRow = ( {user, otherUser} : {user: UserType, otherUser: TradingUser} ) => {
    const [open, setOpen] = useState<boolean>(false);

    const directMessage = async (email: string) => {
        //console.log("direct message with", email);
        //console.log("current user is: ", user.email);
        try {
            const payload: {participants_email: string[]} = {
                participants_email: [user.email, email]
            }
            const response = await axios.post("/api/create-conversation", payload);
            //console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <>
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
            {otherUser.username}
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
            <IconButton onClick={() => directMessage(otherUser.email)} className="ml-1">
                <Tooltip title="Direct Message" placement='top'>
                    <ChatIcon className="text-teal-500"/>
                </Tooltip>
            </IconButton>
        </TableCell>
        <TableCell align="left">
            {otherUser.rank}
        </TableCell>
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
                    <UserDropdown user={otherUser}/>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
    </>
    );
}

export default UserRow;