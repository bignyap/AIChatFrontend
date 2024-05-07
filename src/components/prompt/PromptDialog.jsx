import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

import BasicModal from '../Common/Modal';
import MultiLineTextField from "../Common/TextField"
import {getAllPrompts} from '../../libraries/api'


export default function PromptDialog(props) {

    const initialPrompt = (props.prompt == null) ? "" : props.prompt;
    const initialPromptId = (props.promptId == null) ? 0 : props.promptId;

    const [isNewPrompt, setIsNewPrompt] = React.useState(true)
    const [textInput, setTextInput] = React.useState(initialPrompt)
    const [promptId, setPromptId] = React.useState(initialPromptId)

  const handleClose = () => {
    props.handleClose();
  };

  const handleSubmit = () => {
    if (isNewPrompt) {
        props.onUpdateSubmit(props.id, props.title, textInput, null)
    } else {
        props.onUpdateSubmit(props.id, props.title, null, promptId)
    };
    handleClose();
  };

  return (
    <BasicModal
      dialogContent={<PromptDialogContent 
        setTextInput={setTextInput}
        textInput={textInput}
        setIsNewPrompt={setIsNewPrompt}
        isNewPrompt={isNewPrompt}
        setPromptId={setPromptId}
        promptId={promptId}
      />}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      title={`Edit Thread  - ${props.title}`}
      open={props.open}
    />
  );
}


function PromptDialogContent (props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [listPrompts, setListPrompts] = React.useState([]);

  React.useEffect(() => {
    const fetchDefaultPrompt = async () => {
        
        const allPrompts = await getAllPrompts();
        if (allPrompts.length > 0) {
            setListPrompts(allPrompts)
        }
    };
    
    fetchDefaultPrompt();
    }, []);

    if (props.promptId != null) {
        const currIndex = listPrompts.findIndex(obj => obj["id"] === props.promptId);
        if (currIndex > 0){
            setSelectedIndex(currIndex)
        };
    } else {
        setSelectedIndex(0)
    };

    return (
        <>
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
                    <Switch checked={props.isNewPrompt} 
                    onChange={(event) => {
                    props.setIsNewPrompt(event.target.checked);
                    if (event.target.checked) {
                        props.setTextInput("")
                    } else {
                        props.setTextInput(listPrompts[selectedIndex]["prompt"])
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
                    disabled = {props.isNewPrompt}
                >
                    {listPrompts.map((prompt, index) => (
                    <MenuItem
                        value={prompt["id"]}
                        selected={index === selectedIndex}
                        onClick={() => {
                            setSelectedIndex(index)
                            props.setTextInput(listPrompts[index]["prompt"])
                            props.setPromptId(listPrompts[index]["id"])
                        }}
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
                value= {props.textInput}
                rows={6}
                maxRows={10}
                onChange= {(event) => props.setTextInput(event.target.value)}
                disabled={props.isNewPrompt}
            />
        </>
    )
}
