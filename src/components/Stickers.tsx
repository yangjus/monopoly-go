import { useState, useEffect, ChangeEvent } from "react";
import FilterSelect from "./FilterSelect";
import { Sticker, Album, stickers } from "../../constants/stickers";
import { IconButton, SelectChangeEvent, Modal, Box, Grid, TextField, Button, Typography } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Badge from "./Badge";
import InventoryModal from "./InventoryModal";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import untradeableStickers from "../../images/untradeable_stickers.png";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Image from "next/image";

const style = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '30%',
    height: '20%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 4,
};

export default function Stickers({user, isMobile}: {user: any, isMobile: boolean }) {
    const [selectedAlbum, setSelectedAlbum] = useState<string>("Adventures of Thor");
    const [selectedStar, setSelectedStar] = useState<string>("1");

    const [extraStickers, setExtraStickers] = useState<Sticker[]>();
    const [missingStickers, setMissingStickers] = useState<Sticker[]>();

    const [checkAllAlbum, setCheckAllAlbum] = useState<boolean>(true);
    const [checkAllStar, setCheckAllStar] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

    const [inventoryFirstCopied, setInventoryFirstCopied] = useState<boolean>(false); //1-3 stars
    const [inventoryFirstText, setInventoryFirstText] = useState<string>("");
    const [inventorySecondCopied, setInventorySecondCopied] = useState<boolean>(false); //4-5 stars
    const [inventorySecondText, setInventorySecondText] = useState<string>("");

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

        const inventory: number[] = user.inventory;
        const extra: Sticker[] = inventory.map((quantity, index) => ({ quantity, index }))
            .filter(({ quantity, index }) => quantity > 1 && stickers[index].tradeable)
            .map(({ index }) => stickers[index]);

        const missing: Sticker[] = inventory.map((quantity, index) => ({ quantity, index }))
        .filter(({ quantity, index }) => quantity < 1 && stickers[index].tradeable)
        .map(({ index }) => stickers[index]);

        if (checkAllAlbum && checkAllStar) {
            setExtraStickers(extra);
            setMissingStickers(missing);
        }
        else if (checkAllAlbum) {
            setExtraStickers(extra.filter((sticker: Sticker) =>
                sticker.star === Number(selectedStar)
            ));
            setMissingStickers(missing.filter((sticker: Sticker) =>
                sticker.star === Number(selectedStar)
            ));
        }
        else if (checkAllStar) {
            setExtraStickers(extra.filter((sticker: Sticker) => 
                sticker.album === selectedAlbum
            ));
            setMissingStickers(missing.filter((sticker: Sticker) => 
                sticker.album === selectedAlbum
            ));
        }
        else {
            setExtraStickers(extra.filter((sticker: Sticker) => 
                sticker.album === selectedAlbum && sticker.star === Number(selectedStar)
            ));
            setMissingStickers(missing.filter((sticker: Sticker) => 
                sticker.album === selectedAlbum && sticker.star === Number(selectedStar)
            ));
        }

        let transformedFirstText: string = "";
        let transformedSecondText: string = "";
        let counter: number = 0;

        for (const [albumEnum, albumString] of Object.entries(Album)) {
            counter += 1;
            const extraFirstTemp = extra.filter((sticker: Sticker) => sticker.album === (Album as any)[albumEnum] && 
                sticker.tradeable && sticker.star < 4);
            const needFirstTemp = missing.filter((sticker: Sticker) => sticker.album === (Album as any)[albumEnum] && 
                sticker.tradeable && sticker.star < 4);
            const extraSecondTemp = extra.filter((sticker: Sticker) => sticker.album === (Album as any)[albumEnum] && 
                sticker.tradeable && sticker.star > 3);
            const needSecondTemp = missing.filter((sticker: Sticker) => sticker.album === (Album as any)[albumEnum] && 
                sticker.tradeable && sticker.star > 3);
        
            let temp: string = `-Set ${counter} (${albumString})-\n`;
            temp += `HAVE: [${extraFirstTemp.map((sticker: Sticker) => `${sticker.name}${"⭐".repeat(sticker.star)}`).join(", ")}]\n`;
            temp += `WANT: [${needFirstTemp.map((sticker: Sticker) => `${sticker.name}${"⭐".repeat(sticker.star)}`).join(", ")}]\n\n`;
            transformedFirstText += temp;

            temp = `-Set ${counter} (${albumString})-\n`;
            temp += `HAVE: [${extraSecondTemp.map((sticker: Sticker) => `${sticker.name}${"⭐".repeat(sticker.star)}`).join(", ")}]\n`;
            temp += `WANT: [${needSecondTemp.map((sticker: Sticker) => `${sticker.name}${"⭐".repeat(sticker.star)}`).join(", ")}]\n\n`;
            transformedSecondText += temp;
        }

        transformedFirstText += "Template generated by mgo-trading.com";
        transformedSecondText += "Template generated by mgo-trading.com";

        setInventoryFirstText(transformedFirstText);
        setInventorySecondText(transformedSecondText);

    }, [selectedAlbum, selectedStar, checkAllAlbum, checkAllStar, user.inventory]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInventoryFirstCopy = () => {
        setInventoryFirstCopied(true);
        navigator.clipboard.writeText(inventoryFirstText);
        setTimeout(() => {
          setInventoryFirstCopied(false);
        }, 3000);
    };

    const handleInventorySecondCopy = () => {
        setInventorySecondCopied(true);
        navigator.clipboard.writeText(inventorySecondText);
        setTimeout(() => {
          setInventorySecondCopied(false);
        }, 3000);
    };

    return (
    <div className="mx-1 sm:mx-0">
        <div className="text-2xl text-white pb-5 ml-6 sm:mr-4">
            Tradeable Stickers
            <IconButton onClick={handleOpen} className="mb-1">
                <InfoIcon />
            </IconButton>
        </div>
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <CloseIcon />
                </IconButton>
                <Typography>
                    All stickers in a gold frame are untradeable.
                </Typography>
                {/* <Image
                    className="object-contain max-w-full max-h-full mx-auto"
                    src={untradeableStickers.src}
                    alt="image of untradeable stickers"
                    loading="lazy"
                /> */}
            </Box>
        </Modal>
        {isMobile && <div className="flex items-center justify-center">
                <InventoryModal user={user} isMobile={isMobile}/>
        </div>}
        <div className="sm:flex sm:justify-around">
            <Grid container spacing={1} className="mr-2">
                <Grid item xs={12} sm={11} md={10} className="flex items-center justify-around border border-white rounded-lg border-2 ml-2 p-2 mt-6 sm:mt-0">
                    <div className="flex items-center justify-evenly">
                    <div className="mr-4">
                        <Typography className='text-white'>
                            Copy Inventory to Clipboard:
                        </Typography>
                        <TextField
                            variant="filled"
                            size="small"
                            label="Inventory..."
                            value={inventoryFirstText}
                            InputProps={{
                            readOnly: true,
                            }}
                        />
                    </div>
                    <Grid container>
                        <Grid item xs={12}>
                        <Button
                            sx={{borderColor: 'white', color: 'white', marginBottom: '16px', }}
                            className='border border-opacity-100 border-white bg-teal-500'
                            variant='outlined'
                            startIcon={<FileCopyIcon />}
                            onClick={handleInventoryFirstCopy}
                        >
                            {inventoryFirstCopied ? 'Copied!' : 'Copy (1-3⭐)'}
                        </Button>
                        </Grid>
                        <Grid item xs={12}>
                        <Button
                            sx={{borderColor: 'white', color: 'white'}}
                            className='border border-opacity-100 border-white bg-teal-500'
                            variant='outlined'
                            startIcon={<FileCopyIcon />}
                            onClick={handleInventorySecondCopy}
                        >
                            {inventorySecondCopied ? 'Copied!' : 'Copy (4-5⭐)'}
                        </Button>
                        </Grid>
                    </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="text-white">
                    <FormGroup className="flex justify-end">
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
                            label="All" 
                        />
                    </FormGroup>
                    <FilterSelect 
                        title="Album"
                        disabled={checkAllAlbum}
                        options={albumOptions} 
                        onChange={handleAlbumSelectChange} 
                        selectedOption={selectedAlbum}
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={4} className="text-white">
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
                            label="All" 
                        />
                    </FormGroup>
                    <FilterSelect 
                        title="Star"
                        disabled={checkAllStar}
                        options={starOptions} 
                        onChange={handleStarSelectChange} 
                        selectedOption={selectedStar}
                    />
                </Grid>
            </Grid>
            {!isMobile && <div className="flex items-center">
                <InventoryModal user={user} isMobile={isMobile}/>
            </div>}
        </div>
        <Grid container className="text-white text-2xl my-2">
            <Grid item xs={12} sm={12} className="my-2 text-left">
                Extras:
            </Grid>
            <Grid item xs={12} sm={12}>
                <div className="flex flex-wrap overflow-auto rounded-md bg-white p-1 sm:p-3 h-64">
                    {extraStickers?.map((sticker: Sticker) => (
                        <div className="p-1" key={sticker.name}>
                            <Badge name={sticker.name} album={sticker.album} star={sticker.star} isMobile={false}/>
                        </div>
                    ))}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} className="mb-2 mt-4 text-left">
                Missing:
            </Grid>
            <Grid item xs={12} sm={12}>
                <div className="flex flex-wrap overflow-auto rounded-md bg-white p-1 sm:p-3 h-64">
                    {missingStickers?.map((sticker: Sticker) => (
                        <div className="p-1" key={sticker.name}>
                            <Badge name={sticker.name} album={sticker.album} star={sticker.star} isMobile={false}/>
                        </div>
                    ))}
                </div>
            </Grid>
        </Grid>
    </div>
    );
};