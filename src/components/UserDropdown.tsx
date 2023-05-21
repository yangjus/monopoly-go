import { useState } from 'react';
import {
  Grid, 
  Typography,
  Tooltip,
  Button,
  TextField
} from "@mui/material";
import { stickers } from "../../constants/stickers";
import InfoIcon from '@mui/icons-material/Info';
import { TradingUser } from "@component/pages/trading";
import Badge from "./Badge";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const UserDropdown = ({ user }: { user: TradingUser }) => {

    const [socialCopied, setSocialCopied] = useState<boolean>(false);
    const [inviteCopied, setInviteCopied] = useState<boolean>(false);

    const handleSocialCopy = () => {
      navigator.clipboard.writeText(user.social);
      setSocialCopied(true);
      setTimeout(() => {
        setSocialCopied(false);
      }, 1500);
    };

    const handleInviteCopy = () => {
        navigator.clipboard.writeText(user.invite);
        setInviteCopied(true);
        setTimeout(() => {
          setInviteCopied(false);
        }, 1500);
    };

    return (
    <Grid container spacing={1}>
        {/*They Want*/}
        <Grid item xs={6}>
            <Typography sx={{marginBottom: "10px"}}>
                {user.username}'s Inventory
                <Tooltip title="Based on what they have that you need" placement='top'>
                    <InfoIcon 
                        style={{ 
                            color: 'grey',
                            marginBottom: '2px',
                            marginLeft: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </Tooltip>
            </Typography>
            <div className="row-span-3 flex flex-wrap overflow-auto rounded-md bg-gray-200 p-3 h-64">
                {user.hasStickers?.map((index: number) => (
                    <div className="p-1 " key={stickers[index].name}>
                        <Badge name={stickers[index].name} album={stickers[index].album} star={stickers[index].star}/>
                    </div>
                ))}
            </div>
        </Grid>
        {/*They Have*/}
        <Grid item xs={6}>
            <Typography sx={{marginBottom: "10px"}}>
                Your Inventory
                <Tooltip title="Based on what you have that they need" placement='top'>
                    <InfoIcon 
                        style={{ 
                            color: 'grey',
                            marginBottom: '2px',
                            marginLeft: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </Tooltip>
            </Typography>
            <div className="row-span-3 flex flex-wrap overflow-auto rounded-md bg-gray-200 p-3 h-64">
                {user.needStickers?.map((index: number) => (
                    <div className="p-1" key={stickers[index].name}>
                        <Badge name={stickers[index].name} album={stickers[index].album} star={stickers[index].star}/>
                    </div>
                ))}
            </div>
        </Grid>
        <Grid item xs={6}>
            <div className="flex items-center">
                <TextField
                    variant="filled"
                    size="small"
                    label="Discord/Facebook/Other Link"
                    value={user.social}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                <Button
                    className='text-teal-500 ml-4'
                    startIcon={<FileCopyIcon />}
                    onClick={handleSocialCopy}
                >
                    {socialCopied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
        </Grid>
        <Grid item xs={6}>
            <div className="flex items-center">
                <TextField
                    variant="filled"
                    size="small"
                    label="MonopolyGO! Invite Link"
                    value={user.invite}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                <Button
                    className='text-teal-500 ml-4'
                    startIcon={<FileCopyIcon />}
                    onClick={handleInviteCopy}
                >
                    {inviteCopied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
        </Grid>
    </Grid>
    );
};

export default UserDropdown;