import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuProps } from '@mui/material/Menu';

interface CustomMenuProps extends MenuProps {
  getContentAnchorEl?: null;
}

type SelectOption = {
    label: string;
    value: string;
  };
  
  type SelectProps = {
    title: string;
    disabled: boolean;
    options: SelectOption[];
    onChange: (event: SelectChangeEvent) => void;
    selectedOption: string;
  };
  
export default function FilterSelect({title, disabled, options, onChange, selectedOption}: SelectProps) {

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth disabled={disabled}>
            <InputLabel sx={{ color: "white" }}>{title}</InputLabel>
            <Select
                sx={{
                    color: "white", // sets the text color to white
                    "& label": { color: "white" },
                    "& .MuiSelect-icon": { color: "white" }, // sets the arrow icon color to white
                    "& .MuiInput-underline:before": { borderBottomColor: "white" }, // sets the underline color to white
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "white" } // sets the underline hover color to white
                }}
                value={selectedOption}
                label={title}
                onChange={onChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                          maxHeight: "50vh"
                        }
                    },
                    anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                    },
                    transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                    },
                    getContentAnchorEl: null
                } as CustomMenuProps}
            >
            {options.map((option: SelectOption) => (
                <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
            ))}
            </Select>
        </FormControl>
        </Box>
    );
}