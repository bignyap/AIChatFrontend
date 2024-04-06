import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function SendButton(props) {
  return (
    <Button 
      variant="contained" 
      endIcon={<SendIcon />} 
      sx={{height:'40px'}}
      onClick={props.onClick}
    >
        {props.name}
    </Button>
  );
}