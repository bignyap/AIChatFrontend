import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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
                  props.onDeleteThread(value["id"]);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton 
              selected={value["id"] === props.currThread} 
              onClick={() => props.onSelectThread(value["id"])}
            >
              <ListItemText 
                id={labelId} 
                primary={
                  <Typography 
                    variant="body1" 
                    sx={{ fontWeight: value["id"] === props.currThread ? '550' : '400' }}
                  >
                    {value["name"]}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}