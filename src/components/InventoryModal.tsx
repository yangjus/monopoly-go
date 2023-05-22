import { useState, ChangeEvent } from 'react';
import { Box, Button, Grid, Typography, Modal, IconButton } from '@mui/material';
import { stickers, Sticker, Album } from '../../constants/stickers';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

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

export default function InventoryModal({user}: {user: any}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInventoryState(user.inventory);
    setOpen(false);
  }

  const idStickers = stickers.map((obj, index) => ({
    ...obj,
    id: index
  }));

  const [inventoryState, setInventoryState] = useState<number[]>(user.inventory);

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

  const databaseUpdate = async () => {
    try {
      const payload = {email: user.email, inventory: inventoryState}
      const response = await axios.post("/api/update-inventory", payload);
      console.log("updated user: ", response);
    }
    catch (error) {
      console.error(error);
    }
  }

  const renderInventory = () => {
    //logic: split up stickers by album

    return (
    <Grid container spacing={1} className="justify-center">
            {Object.values(Album).map((album) => (
            <div key={album}>
            <Grid item xs={12} className="border border-teal-500 justify-center ml-3 mr-3 mt-3 mb-3 p-2">
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
    <button 
      type="submit"
      onClick={handleOpen}
      className="border border-white bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    >
      View/Edit Inventory
    </button>

    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 0, right: 0 }}>
                <CloseIcon />
            </IconButton>
            <Typography variant="h5">
            Your Inventory
            </Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
            All stickers you currently have, including non-duplicates.
            </Typography>
            {renderInventory()}
            <form method="POST" onSubmit={databaseUpdate}>
              <button 
                type="submit" 
                className="border border-white bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                  Save Changes
              </button>
            </form>
        </Box>
    </Modal>
    </div>
  );
}