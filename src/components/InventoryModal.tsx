import { useState, ChangeEvent } from 'react';
import { Box, Button, Grid, Typography, Modal } from '@mui/material';
import { stickers, Sticker, Album } from '../../constants/stickers';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  overflow: 'auto',
  boxShadow: 24,
  p: 4,
  textAlign: "center"
};

interface StickerID {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean,
    id: number
};

export default function InventoryModal({user, inventory}: {user: any, inventory: number[]}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInventoryState(inventory);
    setOpen(false);
  }

  const idStickers = stickers.map((obj, index) => ({
    ...obj,
    id: index
  }));

  const [inventoryState, setInventoryState] = useState<number[]>(inventory);

  const handleInventoryChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    let temp: number[] = [...inventoryState]
    temp[id] = Number(e.target.value);
    setInventoryState(temp);
  };

  const handleKeyPress = (e: any) => {
    const enteredValue = Number(e.target.value + e.key);
    if (enteredValue > 99) {
      e.preventDefault();
    }
  };

  const renderInventory = () => {
    //logic: split up stickers by album

    return (
    <Grid container spacing={1} className="justify-center">
            {Object.values(Album).map((album) => (
            <div key={album}>
            <Grid item xs={12} className="border border-teal-500 justify-center m-3 p-2">
                <div className="text-teal-500 font-bold text-2xl">{album}</div>
                {idStickers.filter((sticker) => sticker.album === album).map((sticker: StickerID) => (
                    <div className="flex justify-between py-1 text-sm" key={sticker.id}>
                        <label className="mr-1">{sticker.name}</label>
                        <input
                            type="number"
                            value={inventoryState[sticker.id]}
                            onChange={(e) => handleInventoryChange(e, sticker.id)}
                            min={0}
                            max={99}
                            onKeyDown={handleKeyPress}
                            className="border border-black p-1 w-16"
                        />
                    {/*<p>Current value: {inventoryState[sticker.id]}</p>*/}
                    </div>
                ))}
            </Grid>
            </div>
            ))}
    </Grid>
    )
  };

  return (
    <div>
    <Button 
        className="border border-white hover:bg-teal-400 text-white"
        variant="outlined"
        onClick={handleOpen}>View/Edit Inventory
    </Button>

    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <Typography variant="h5">
            Your Inventory
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
            All stickers you currently have, including non-duplicates.
            </Typography>
            {renderInventory()}
        </Box>
    </Modal>
    </div>
  );
}