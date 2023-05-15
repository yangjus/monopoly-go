import { useState, useEffect } from "react";
import FilterSelect from "./FilterSelect";
import { Sticker, Album, stickers } from "../../constants/stickers";
import { SelectChangeEvent } from "@mui/material";

export default function Stickers() {
    const [selectedAlbum, setSelectedAlbum] = useState<string>("New York");
    const [selectedStar, setSelectedStar] = useState<string>("1");
    const [selectedStickers, setSelectedStickers] = useState<Sticker[]>();

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

    useEffect(() => {
        console.log(selectedAlbum);
        console.log(selectedStar);
        const filteredStickers: Sticker[] = stickers.filter((sticker) => 
            sticker.album === selectedAlbum && sticker.star === Number(selectedStar)
        )
        setSelectedStickers(filteredStickers);

    }, [selectedAlbum, selectedStar]);

    return (
    <div>
        <div className="text-2xl text-white pb-5">Tradeable Stickers</div>
        <div className="grid grid-rows-8 gap-4 text-left">
            <div className="row-span-1 rounded-md text-white">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex items-center justify-center">
                        Filter:
                    </div>
                    <div className="col-span-1">
                        <FilterSelect 
                            title="Album"
                            options={albumOptions} 
                            onChange={handleAlbumSelectChange} 
                            selectedOption={selectedAlbum}
                        />
                    </div>
                    <div className="col-span-1">
                        <FilterSelect 
                            title="Star"
                            options={starOptions} 
                            onChange={handleStarSelectChange} 
                            selectedOption={selectedStar}
                        />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        View/Edit Inventory
                    </div>
                </div>
            </div>
            <div className="row-span-1 text-2xl text-white">
                Extras:
            </div>
            <div className="row-span-3 flex flex-wrap rounded-md bg-white p-3 h-64">
                {selectedStickers?.map((sticker: Sticker) => (
                    <>
                    <div>
                        Name: {sticker.name} | Album: {sticker.album}
                    </div>
                    <div>
                        Star: {sticker.star.toString()} | Tradeable?: {sticker.tradeable ? "true" : "false"}
                    </div>
                    </>
                ))}
            </div>
            <div className="row-span-1 text-2xl text-white">
                Missing:
            </div>
            <div className="row-span-2 rounded-md bg-white p-3 h-64">
                insert missing stickers here
            </div>
        </div>
    </div>
    );
};