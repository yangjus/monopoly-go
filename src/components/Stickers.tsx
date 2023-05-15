import { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import { Sticker, Album, stickers } from "../../constants/stickers";

export default function Stickers() {
    const [selectedAlbum, setSelectedAlbum] = 
        useState<{label: string, value: string}>({label: "New York", value: "New York"});
    const [selectedStar, setSelectedStar] = 
        useState<{label: string, value: string}>({label: "1", value: "1"});
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
  
    const handleAlbumDropdownChange = (value: string) => {
        setSelectedAlbum({label: value, value: value});
    };

    const handleStarDropdownChange = (value: string) => {
        setSelectedStar({label: value, value: value});
    };

    useEffect(() => {
        console.log(selectedAlbum);
        console.log(selectedStar);
        const filteredStickers: Sticker[] = stickers.filter((sticker) => 
            sticker.album === selectedAlbum?.value && sticker.star === Number(selectedStar?.value)
        )
        setSelectedStickers(filteredStickers);

    }, [selectedAlbum, selectedStar]);

    return (
    <div>
        <div className="text-2xl text-white pb-5">Tradeable Stickers</div>
        <div className="grid grid-rows-6 gap-4 text-left">
            <div className="row-span-1 rounded-md text-white">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1 flex items-center justify-center">
                        Filter:
                    </div>
                    <div className="col-span-1">
                        Album
                        <FilterDropdown 
                            options={albumOptions} 
                            onChange={handleAlbumDropdownChange} 
                            selectedOption={selectedAlbum}
                        />
                    </div>
                    <div className="col-span-1">
                        Star
                        <FilterDropdown 
                            options={starOptions} 
                            onChange={handleStarDropdownChange} 
                            selectedOption={selectedStar}
                        />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        View/Edit Inventory
                    </div>
                </div>
            </div>
            <div className="row-span-3 rounded-md bg-white p-5">
                Extras:
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
            <div className="row-span-2 rounded-md bg-white p-5">
                Missing:
            </div>
        </div>
    </div>
    );
};