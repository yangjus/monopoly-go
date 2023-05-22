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

const UserRow = ( {user} : {user: TradingUser} ) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
    <>
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
            {user.username}
            {user.trusted &&
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
        </TableCell>
        <TableCell align="left">
            {user.rank}
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
                    <UserDropdown user={user}/>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
    </>
    );
}

export default UserRow;