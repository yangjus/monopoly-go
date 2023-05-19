import { useState, useEffect, ChangeEvent } from "react";
import FilterSelect from "./FilterSelect";
import { Sticker, Album, stickers } from "../../constants/stickers";
import { SelectChangeEvent } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Badge from "./Badge";
import InventoryModal from "./InventoryModal";

export default function Stickers({user, inventory}: {user: any, inventory: number[]}) {
    const [selectedAlbum, setSelectedAlbum] = useState<string>("New York");
    const [selectedStar, setSelectedStar] = useState<string>("1");
    const [selectedStickers, setSelectedStickers] = useState<Sticker[]>();
    const [checkAllAlbum, setCheckAllAlbum] = useState<boolean>(true);
    const [checkAllStar, setCheckAllStar] = useState<boolean>(true);

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
        console.log(`selected album: `, selectedAlbum);
        console.log(`selected star: `, selectedStar);
        console.log(`all albums? `, checkAllAlbum);
        console.log(`all stars? `, checkAllStar);

        if (checkAllAlbum && checkAllStar) {
            const allTradeableStickers: Sticker[] = stickers.filter((sticker) =>
                sticker.tradeable
            )
            setSelectedStickers(allTradeableStickers);
        }
        else if (checkAllAlbum) {
            const allAlbumStickers: Sticker[] = stickers.filter((sticker) =>
                sticker.star === Number(selectedStar) && sticker.tradeable
            )
            setSelectedStickers(allAlbumStickers);
        }
        else if (checkAllStar) {
            const allStarStickers: Sticker[] = stickers.filter((sticker) => 
                sticker.album === selectedAlbum && sticker.tradeable
            )
            setSelectedStickers(allStarStickers);
        }
        else {
            const filteredStickers: Sticker[] = stickers.filter((sticker) => 
                sticker.album === selectedAlbum && sticker.star === Number(selectedStar) && sticker.tradeable
            )
            setSelectedStickers(filteredStickers);
        }

    }, [selectedAlbum, selectedStar, checkAllAlbum, checkAllStar]);

    return (
    <div>
        <div className="text-2xl text-white pb-5">Tradeable Stickers</div>
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
                        <InventoryModal user={user} inventory={inventory}/>
                    </div>
                </div>
            </div>
            <div className="row-span-1 text-2xl text-white">
                Extras:
            </div>
            <div className="row-span-3 flex flex-wrap overflow-auto rounded-md bg-white p-3 h-64">
                {selectedStickers?.map((sticker: Sticker) => (
                    <div className="p-1" key={sticker.name}>
                        <Badge name={sticker.name} album={sticker.album} star={sticker.star}/>
                    </div>
                ))}
            </div>
            <div className="row-span-1 text-2xl text-white">
                Missing:
            </div>
            <div className="row-span-2 flex flex-wrap overflow-auto rounded-md bg-white p-3 h-64">
                insert missing stickers here
            </div>
        </div>
    </div>
    );
};