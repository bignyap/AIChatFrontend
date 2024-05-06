import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MultiLineTextField from "./TextField"
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';


import {
  updateDefaultPrompt, getDefaultPrompt, getAllPrompts
} from '../../libraries/api'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paperWidthSm': {
    width: '600px',
    maxWidth: '800px',
  },
}));

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(props.open);
  const [textInput, setTextInput] = React.useState("")
  const [isNewPrompt, setIsNewPrompt] = React.useState(true)
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [listPrompts, setListPrompts] = React.useState([]);

  React.useEffect(() => {
    const fetchDefaultPrompt = async () => {
        
        const allPrompts = await getAllPrompts();
        if (allPrompts.length > 0) {
          setListPrompts(allPrompts)
        }

        setSelectedIndex(0)
        
        // const defaultPrompt = await getThreadPrompt();
        // if (defaultPrompt) {
        //   const index = allPrompts.findIndex(obj => obj["id"] === defaultPrompt["id"]);
        //   setSelectedIndex(index)
        // }
    };
    
    fetchDefaultPrompt();
}, []);

  const handleClose = () => {
    setOpen(false);
    props.handleClose()
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {props.title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Switch checked={isNewPrompt} 
              onChange={(event) => {
                setIsNewPrompt(event.target.checked);
                if (event.target.checked) {
                  setTextInput("")
                } else {
                  setTextInput(listPrompts[selectedIndex]["prompt"])
                }
                
              }}/>
            }
            label="Create New Prompt"
          />
          <FormControl sx={{ mt: 2, minWidth: 300 }}>
            <InputLabel htmlFor="list-prompt">Choose Prompts</InputLabel>
            <Select
              autoFocus
              // onChange={handleMaxWidthChange}
              label="Prompts"
              inputProps={{
                name: 'list-prompt',
                id: 'list-prompt',
              }}
              disabled = {isNewPrompt}
            >
              {listPrompts.map((prompt, index) => (
              <MenuItem
                value={prompt["id"]}
                selected={index === selectedIndex}
                onClick={() => setTextInput(listPrompts[index]["prompt"])}
              >
               {prompt["name"]}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>
        <MultiLineTextField 
          label={""}
          id={1}
          placeholder={"Write the prompt here"}
          value= {textInput}
          rows={6}
          maxRows={10}
          onChange= {(event) => setTextInput(event.target.value)}
          disabled={isNewPrompt}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
