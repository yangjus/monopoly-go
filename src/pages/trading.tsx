import { GetServerSideProps } from "next";
import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import jwt from "jsonwebtoken";
import ReactPaginate from 'react-paginate';
import { hasCookie, getCookie } from 'cookies-next';
import connect from "@component/../lib/mongodb";
import User from "@component/../model/user_schema";
import Conversation from "@component/../model/conversation_schema";
import { UserType } from "../../constants/users";
import { Album, stickers } from "../../constants/stickers";
import FilterSelect from "@component/components/FilterSelect";
import UserRow from "@component/components/UserRow";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LiveChatWindow from "@component/components/LiveChatWindow";
import GlobalChatWindow from "@component/components/GlobalChatWindow";
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Tooltip,
    Grid, 
    FormGroup, 
    FormControlLabel, 
    Checkbox, 
    SelectChangeEvent, 
    Switch
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import moment from "moment";

export interface TradingUser {
    email: string,
    username: string,
    rank: number,
    invite: string,
    social: string,
    trusted: boolean,
    hasStickers: number[],
    needStickers: number[]
}

interface TradingPageType {
    user: UserType,
    matchedUsers: TradingUser[],
    allConversations: any
}

const WhiteSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: grey[50],
      '&:hover': {
        backgroundColor: alpha(grey[50], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: grey[50],
    },
}));

export default function Trading({ user, matchedUsers, allConversations }: TradingPageType) {

    const [selectedAlbum, setSelectedAlbum] = useState<string>("Adventures of Thor");
    const [selectedStar, setSelectedStar] = useState<string>("1");

    const [checkAllAlbum, setCheckAllAlbum] = useState<boolean>(true);
    const [checkAllStar, setCheckAllStar] = useState<boolean>(true);

    const [filteredUsers, setFilteredUsers] = useState<TradingUser[]>(matchedUsers);
    const [isMobile, setIsMobile] = useState(false);
    const [windowHeight, setWindowHeight] = useState<number>(0);

    const [notification, setNotification] = useState<boolean>(user.email_notification);
    const [disableToggle, setDisableToggle] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
          setWindowHeight(Math.floor(window.innerHeight / 50) * 50 - 250);
        };
    
        handleResize(); // Check initial window size
        window.addEventListener('resize', handleResize); // Add event listener for window resize
    
        return () => {
          window.removeEventListener('resize', handleResize); // Clean up the event listener on component unmount
        };
    }, []);

    const albumOptions: {label: Album, value: Album}[] = Object.values(Album).map((album) => ({
        label: album,
        value: album
    }));

    const starOptions: {label: string, value: string}[] = [
        {label: "1", value: "1"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
        {label: "4", value: "4"},
        {label: "5", value: "5"}
    ]

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5; // Number of users to display per page
    const maxDisplayedPages = 80; // Maximum number of displayed pages
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

    const displayUsers = pageCount > maxDisplayedPages ?
        filteredUsers
            .slice(0, usersPerPage)
            .map((otherUser: TradingUser) => 
                    <UserRow user={user} otherUser={otherUser} isMobile={isMobile} key={otherUser.email}/>
            ) :
        filteredUsers
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((otherUser: TradingUser) => 
                    <UserRow user={user} otherUser={otherUser} isMobile={isMobile} key={otherUser.email}/>
            );

    const handleAlbumSelectChange = (event: SelectChangeEvent) => {
        setSelectedAlbum(event.target.value as string);
    };

    const handleStarSelectChange = (event: SelectChangeEvent) => {
        setSelectedStar(event.target.value as string);
    };

    const handleCheckAlbum = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckAllAlbum(event.target.checked);
    };

    const handleCheckStar = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckAllStar(event.target.checked);
    };

    const changeNotification = async (event: ChangeEvent<HTMLInputElement>) => {
        setNotification(event.target.checked);
        setDisableToggle(true);
        //update user in database
        try {
            const payload = {email: user.email, email_notification: event.target.checked}
            const response = await axios.post("/api/email-notification", payload);
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setDisableToggle(false);
        }, 10000);
    }

    useEffect(() => {
        if (checkAllAlbum && checkAllStar) {
            setFilteredUsers(matchedUsers);
        }
        else if (checkAllAlbum) {
            const users: TradingUser[] = [];
            matchedUsers.map((otherUser: TradingUser) => {
                const filteredStickers: number[] = otherUser.hasStickers.filter((index: number) => 
                    stickers[index].star === Number(selectedStar)
                );
                if (filteredStickers.length > 0) {
                    users.push({ ...otherUser, hasStickers: filteredStickers})
                }
            });
            setFilteredUsers(users);
        }
        else if (checkAllStar) {
            const users: TradingUser[] = [];
            matchedUsers.map((otherUser: TradingUser) => {
                const filteredStickers: number[] = otherUser.hasStickers.filter((index: number) => 
                    stickers[index].album === selectedAlbum
                );
                if (filteredStickers.length > 0) {
                    users.push({ ...otherUser, hasStickers: filteredStickers})
                }
            });
            setFilteredUsers(users);
        }
        else {
            const users: TradingUser[] = [];
            matchedUsers.map((otherUser: TradingUser) => {
                const filteredStickers: number[] = otherUser.hasStickers.filter((index: number) => 
                    stickers[index].album === selectedAlbum && stickers[index].star === Number(selectedStar)
                );
                if (filteredStickers.length > 0) {
                    users.push({ ...otherUser, hasStickers: filteredStickers})
                }
            });
            setFilteredUsers(users);
        }

    }, [selectedAlbum, selectedStar, checkAllAlbum, checkAllStar, matchedUsers]);

    return (
    <div className="items-center space-y-4 min-h-screen">
        <div className="text-4xl pt-5 text-center justify-center">Marketplace</div>
        <div className="text-xl text-center justify-center">
            Finds other users who have what you need, and want what you have!
        </div>
        <Grid container className="sm:p-6 flex justify-between">
            <Grid item xs={12} sm={2.5} className="rounded-md bg-teal-500 p-5 mb-4 sm:mb-0">
                <div className="text-white text-2xl">
                    Filter
                    <Tooltip title="Filter based on stickers you need" placement='top'>
                        <InfoIcon 
                            style={{ 
                                color: 'white',
                                marginBottom: '4px',
                                marginLeft: '8px',
                                fontSize: '1.5rem'
                            }}
                        />
                    </Tooltip>
                </div>
                <div className="mb-4 sm:mb-10">
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Checkbox
                                    checked={checkAllAlbum}
                                    onChange={handleCheckAlbum}
                                    sx={{
                                        color: "white",
                                        '&.Mui-checked': {
                                        color: "white",
                                        },
                                    }}
                                />
                            } 
                            labelPlacement="start" 
                            label={<span style={{ color: "white" }}>All</span>} 
                        />
                    </FormGroup>
                    <FilterSelect 
                        title="Album"
                        disabled={checkAllAlbum}
                        options={albumOptions} 
                        onChange={handleAlbumSelectChange} 
                        selectedOption={selectedAlbum}
                    />
                </div>
                <div className="mb-4 sm:mb-10">
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Checkbox
                                    checked={checkAllStar}
                                    onChange={handleCheckStar}
                                    sx={{
                                        color: "white",
                                        '&.Mui-checked': {
                                        color: "white",
                                        },
                                    }}
                                />
                            } 
                            labelPlacement="start" 
                            label={<span style={{ color: "white" }}>All</span>}  
                        />
                    </FormGroup>
                    <FilterSelect 
                        title="Star"
                        disabled={checkAllStar}
                        options={starOptions} 
                        onChange={handleStarSelectChange} 
                        selectedOption={selectedStar}
                    />
                </div>
                <div className="text-white flex justify-between items-center">
                    <div>
                        <Tooltip title="Recieve an email when a user messages you" placement='top'>
                            <NotificationsIcon 
                                style={{ 
                                    color: 'white',
                                    marginBottom: '4px',
                                    marginRight: '4px'
                                }}
                            />
                        </Tooltip>
                        Email Notifications
                    </div>
                    <WhiteSwitch 
                        className="m-0"
                        checked={notification}
                        onChange={changeNotification}
                        disabled={disableToggle}
                    />
                </div>
                <div className="text-xs text-white">
                    Recieve emails for direct messages
                </div>
                <div className="fixed bottom-4 left-4 flex items-center z-20 justify-center bg-blue-700 rounded-full">
                    <LiveChatWindow user={user} conversations={allConversations} isMobile={isMobile}/>
                </div>
                <div className="fixed bottom-4 left-24 flex items-center z-10 justify-center bg-blue-700 rounded-full">
                    <GlobalChatWindow user={user} isMobile={isMobile} windowHeight={windowHeight}/>
                </div>
            </Grid>
            <Grid item xs={12} sm={9} className="rounded-md bg-teal-500 p-5 mb-2">
                <TableContainer component={Paper} className="flex justify-center sm:px-2">
                    <Table
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography className="text-lg">
                                        Username {isMobile ? String.fromCharCode(40) + "Net Worth" + String.fromCharCode(41) : ""}
                                    </Typography>
                                </TableCell>
                                {!isMobile &&
                                    <TableCell align="left"><Typography variant='h6'>Net Worth</Typography></TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayUsers}
                        </TableBody>
                    </Table>
                </TableContainer>
                {filteredUsers.length === 0 &&
                    <div className="text-center p-6 text-2xl text-white">
                        No users matched, please fill or update inventory
                    </div>
                }
                <div className="flex justify-center mt-4 bottom-0">
                    {pageCount > maxDisplayedPages ? (
                        <p className="text-white">Too many users to display. Filter users to display again.</p>
                        ) : (
                        <ReactPaginate
                            pageCount={pageCount}
                            onPageChange={(data) => {
                                setPageNumber(data.selected);
                            }}
                            containerClassName={'flex items-center space-x-2'}
                            previousLinkClassName={'p-1 border rounded-full bg-white'}
                            nextLinkClassName={'p-1 border rounded-full bg-white'}
                            disabledClassName={'opacity-50 cursor-not-allowed'}
                            activeClassName={'text-white font-bold'}
                            nextLabel={<ArrowForwardIosIcon style={{ fontSize: 20, width: 30 }} />}
                            previousLabel={<ArrowBackIosIcon style={{ fontSize: 20, width: 30, paddingLeft: 5 }} />}
                        />)
                    }
                </div>
            </Grid>
      </Grid>
    </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }: {req: any, res: any }) => {

    if (!hasCookie('session', { req, res })) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        },
      }
    }
  
    const token: any = getCookie('session', { req, res });
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN!);
  
    const userEmail: {email: string, iat: number} = {...decodedToken};
  
    connect();
  
    const userObject: any = await User.findOne({email: userEmail.email}).lean();
    const parsedObject: any = JSON.parse(JSON.stringify(userObject));
  
    const user: UserType = {
      email: parsedObject.email,
      password: parsedObject.password,
      username: parsedObject.username,
      rank: parsedObject.rank,
      invite: parsedObject.invite,
      social: parsedObject.social,
      trusted: parsedObject.trusted,
      inventory: parsedObject.inventory,
      email_notification: parsedObject.email_notification
    }

    //find all users in db that have atleast 1 sticker user doesn't have,
    //and atleast 1 sticker they want that user does have
    interface ParsedUser {
        email: string,
        username: string,
        rank: number,
        invite: string,
        social: string,
        trusted: boolean,
        inventory: number[],
        last_logged: Date
    }

    interface TradingUserDate {
        email: string,
        username: string,
        rank: number,
        invite: string,
        social: string,
        trusted: boolean,
        lastLogged: Date,
        hasStickers: number[],
        needStickers: number[]
    }

    const query: string = 'email username rank invite social trusted inventory last_logged';
    const users: ParsedUser[] = await User.find({}, query).exec();
    const matchedUsersDate: TradingUserDate[] = [];

    users.map((otherUser) => {
        //an array of indexes referring to which stickers another user has that the current user needs
        const hasStickers: number[] = [];
        //stickers another user needs that the current user has
        const needStickers: number[] = [];
        for (let i = 0; i < user.inventory.length; i++) {
            if (stickers[i].tradeable) {
                if (user.inventory[i] == 0 && otherUser.inventory[i] > 1) {
                    hasStickers.push(i);
                }
                if (user.inventory[i] > 1 && otherUser.inventory[i] == 0) {
                    needStickers.push(i);
                }
            }
        }
        if (hasStickers.length > 0 && needStickers.length > 0) {
            const addUser: TradingUserDate = {
                email: otherUser.email,
                username: otherUser.username,
                rank: otherUser.rank,
                invite: otherUser.invite,
                social: otherUser.social,
                trusted: otherUser.trusted,
                lastLogged: otherUser.last_logged,
                hasStickers: hasStickers,
                needStickers: needStickers
            }
            matchedUsersDate.push(addUser);
        }
    })

    //sort matchedUsers with first being the latest time for lastLogged
    //this is to prevent users from having to scroll needlessly through inactive accounts
    matchedUsersDate.sort((a, b) => moment(b.lastLogged).diff(moment(a.lastLogged)));
    const matchedUsers: TradingUser[] = matchedUsersDate.map(({ lastLogged, ...rest }) => rest);

    //live chat logic
    //find all conversation objects that contain user.email inside participants_email
    //get all those objects
    
    const allConversations = await Conversation.find({
        participants_email: user.email,
        hide: { $nin: [user.email] }
    }).exec();
  
    if (user) {
      return {
        props: {
          user,
          matchedUsers,
          allConversations: JSON.parse(JSON.stringify(allConversations))
        }
      }
    }
  
    //fallback
    //const initialArray = new Array(stickers.length).fill(0);
    return {
      props: {
        user: {},
        matchedUsers: [],
        allConversations: []
      }
    }
  }

