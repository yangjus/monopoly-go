import { GetServerSideProps } from "next";
import { useState, ChangeEvent, useEffect } from "react";
import jwt from "jsonwebtoken";
import { hasCookie, getCookie } from 'cookies-next';
import connect from "@component/../lib/mongodb";
import User from "@component/../model/schema";
import { UserType } from "../../constants/users";
import { FormGroup, FormControlLabel, Checkbox, SelectChangeEvent } from '@mui/material';
import { Sticker, Album, stickers } from "../../constants/stickers";
import FilterSelect from "@component/components/FilterSelect";
import UserRow from "@component/components/UserRow";
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography,
    Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export interface TradingUser {
    username: string,
    rank: number,
    invite: string,
    social: string,
    trusted: boolean,
    hasStickers: number[],
    needStickers: number[]
}

export default function Trading({ user, matchedUsers }: { user: UserType, matchedUsers: TradingUser[] }) {

    console.log(matchedUsers);

    const [selectedAlbum, setSelectedAlbum] = useState<string>("New York");
    const [selectedStar, setSelectedStar] = useState<string>("1");

    const [checkAllAlbum, setCheckAllAlbum] = useState<boolean>(true);
    const [checkAllStar, setCheckAllStar] = useState<boolean>(true);

    const [filteredUsers, setFilteredUsers] = useState<TradingUser[]>(matchedUsers);

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

    }, [selectedAlbum, selectedStar, checkAllAlbum, checkAllStar]);

    console.log(user);

    return (
    <div className="items-center h-screen  space-y-4">
        <div className="text-4xl pt-5 text-center justify-center">Marketplace</div>
        <div className="text-xl text-center justify-center">
            Finds other users who have what you need, and want what you have!
        </div>
        <div className="grid grid-cols-3 gap-4 px-10 py-5">
            <div className="col-span-1 rounded-md bg-teal-500 p-5">
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
                <div className="mb-10">
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
                <div>
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
            </div>
            <div className="col-span-2 rounded-md bg-teal-500 p-5">
                <TableContainer component={Paper} className="px-2">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"><Typography variant='h6'>Username</Typography></TableCell>
                                <TableCell align="left"><Typography variant='h6'>Rank</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredUsers.map((user: TradingUser) => (
                            <UserRow user={user}/>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
      </div>
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
      trusted: true, //change this later
      inventory: parsedObject.inventory
    }

    //find all users in db that have atleast 1 sticker user doesn't have,
    //and atleast 1 sticker they want that user does have
    interface ParsedUser {
        username: string,
        rank: number,
        invite: string,
        social: string,
        trusted: boolean,
        inventory: number[]
    }

    const users: ParsedUser[] = await User.find({}, 'username rank invite social trusted inventory').exec();
    const matchedUsers: TradingUser[] = [];

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
            const addUser: TradingUser = {
                username: otherUser.username,
                rank: otherUser.rank,
                invite: otherUser.invite,
                social: otherUser.social,
                trusted: otherUser.trusted,
                hasStickers: hasStickers,
                needStickers: needStickers
            }
            matchedUsers.push(addUser);
        }
    })
  
    if (user) {
      return {
        props: {
          user,
          matchedUsers,
        }
      }
    }
  
    //fallback
    //const initialArray = new Array(stickers.length).fill(0);
    return {
      props: {
        user: {},
        matchedUsers: [],
      }
    }
  }

