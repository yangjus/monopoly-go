import { useState, ChangeEvent } from 'react';
import { Box, Grid, Typography, Modal, IconButton } from '@mui/material';
import { stickers, Album } from '../../constants/stickers';
import CloseIcon from '@mui/icons-material/Close';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from "axios";

interface StickerID {
    name: string,
    album: Album,
    star: number,
    tradeable: boolean,
    id: number
};

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

const mobileStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '95%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
  textAlign: "center"
}

export default function InventoryModal({user, isMobile}: {user: any, isMobile: boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInventoryState(user.inventory);
    setOpen(false);
  }
  const [success, setSuccess] = useState<boolean>(false);

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
      //console.log("updated user: ", response);
      setSuccess(true);
    }
    catch (error) {
      console.error(error);
    }
  }

  const incrementSticker = (stickerId: number, isAdd: boolean) => {
    setInventoryState((prevState: number[]) => {
      const counter: number = isAdd ? 1 : -1;
      const updatedState: number[] = [...prevState];
      updatedState[stickerId] += counter;
      if (updatedState[stickerId] < 0) {
        updatedState[stickerId] = 0;
      }
      if (updatedState[stickerId] > 99) {
        updatedState[stickerId] = 99;
      }
      return updatedState;
    });
  };

  const renderInventory = () => {
    //logic: split up stickers by album

    return (
    <Grid container spacing={1} className="justify-center">
      {Object.values(Album).map((album) => (
      <div key={album}>
      <Grid item xs={12} className="border border-teal-500 justify-center m-3 p-2">
        <div className="text-teal-500 font-bold text-3xl sm:text-2xl mb-2">{album}</div>
          {idStickers.filter((sticker) => sticker.album === album).map((sticker: StickerID) => (
            <div className="py-1 text-xl sm:text-sm m-1 sm:m-0" key={sticker.id}>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={6} md={8} className="flex text-left">
                      <label className="sm:mr-1 mt-2 sm:mt-1">{sticker.name}</label>
                </Grid>
                <Grid item xs={6} md={4} className="flex justify-right">
                  {isMobile &&
                    <IconButton color="error" onClick={() => incrementSticker(sticker.id, false)}>
                      <IndeterminateCheckBoxIcon fontSize="large"/>
                    </IconButton>
                  }
                  <input
                      type="number"
                      value={inventoryState[sticker.id]}
                      onChange={(e) => handleInventoryChange(e, sticker.id)}
                      min={0}
                      max={99}
                      onKeyDown={handleKeyPress}
                      className="border border-black p-1 w-10 sm:w-12"
                  />
                  {isMobile &&
                    <IconButton color="primary" onClick={() => incrementSticker(sticker.id, true)}>
                      <AddBoxIcon fontSize="large"/>
                    </IconButton>
                  }
                </Grid>
              </Grid>
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
      className="border border-white bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-4"
    >
      View/Edit Inventory
    </button>
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={isMobile ? mobileStyle : style}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
              <CloseIcon fontSize="large"/>
          </IconButton>
          <Typography variant="h4">
          Your Inventory
          </Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>
          All stickers you currently have, including non-duplicates.
          </Typography>
          {renderInventory()}
          {success && (
          <p className="md:flex md:items-center text-green-500 mb-4 justify-center pt-2">
              Inventory update successful! Please refresh page to see changes.
          </p>
          )}
          <form method="POST">
            <button 
              onClick={databaseUpdate}
              type="button" 
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