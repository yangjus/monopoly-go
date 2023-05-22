import { useState, useEffect, ChangeEvent } from "react";
import FilterSelect from "./FilterSelect";
import { Sticker, Album, stickers } from "../../constants/stickers";
import { IconButton, SelectChangeEvent, Modal, Box } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Badge from "./Badge";
import InventoryModal from "./InventoryModal";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import untradeableStickers from "../../images/untradeable_stickers.jpg";
import Image from "next/image";

const style = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    width: '30%',
    height: '80%',
    transform: 'translate(-50%, -50%)', 
    bgcolor: 'background.paper', 
    boxShadow: 24, 
    p: 4,
};

export default function Stickers({user }: {user: any }) {
    const [selectedAlbum, setSelectedAlbum] = useState<string>("New York");
    const [selectedStar, setSelectedStar] = useState<string>("1");

    const [extraStickers, setExtraStickers] = useState<Sticker[]>();
    const [missingStickers, setMissingStickers] = useState<Sticker[]>();

    const [checkAllAlbum, setCheckAllAlbum] = useState<boolean>(true);
    const [checkAllStar, setCheckAllStar] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);

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

    }, [selectedAlbum, selectedStar, checkAllAlbum, checkAllStar, user.inventory]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <div>
        <div className="text-2xl text-white pb-5 mr-4">
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
                <Image
                    className="object-contain max-w-full max-h-full mx-auto"
                    src={untradeableStickers.src}
                    alt="image of untradeable stickers"
                    loading="lazy"
                />
            </Box>
        </Modal>
        <div className="grid grid-rows-8 gap-4 text-left">
            <div className="row-span-1 rounded-md text-white">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
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
                    </div>
                    <div className="col-span-1">
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
                    </div>
                    <div className="col-span-1 flex justify-center mt-12">
                        <InventoryModal user={user} />
                    </div>
                </div>
            </div>
            <div className="row-span-1 text-2xl text-white">
                Extras:
            </div>
            <div className="row-span-3 flex flex-wrap overflow-auto rounded-md bg-white p-3 h-64">
                {extraStickers?.map((sticker: Sticker) => (
                    <div className="p-1" key={sticker.name}>
                        <Badge name={sticker.name} album={sticker.album} star={sticker.star}/>
                    </div>
                ))}
            </div>
            <div className="row-span-1 text-2xl text-white">
                Missing:
            </div>
            <div className="row-span-2 flex flex-wrap overflow-auto rounded-md bg-white p-3 h-64">
                {missingStickers?.map((sticker: Sticker) => (
                    <div className="p-1" key={sticker.name}>
                        <Badge name={sticker.name} album={sticker.album} star={sticker.star}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};