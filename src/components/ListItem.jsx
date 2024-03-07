import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ThreadListItem(props) {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {props.items.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem 
            key={value} 
            disablePadding
            secondaryAction={
              <IconButton 
                edge="end" aria-label="comments" 
                onClick={() => {
                  console.log(234); // Check if onClick is triggered
                  props.onDeleteThread(value[0]);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton selected={value[0] === props.currThread} onClick={() => props.onSelectThread(value[0])}>
              <ListItemText id={labelId} primary={value[3]} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}


// sx={{backgroundColor: value[0] === props.currThread? 'red': 'black'}}