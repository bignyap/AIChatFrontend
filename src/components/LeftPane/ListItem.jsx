import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThreadMenu from './ThreadMenu';
import BasicModal from '../Common/Modal';

export default function ThreadListItem(props) {
  
  const [editingThreadId, setEditingThreadId] = useState(null);
  const [editedThreadName, setEditedThreadName] = useState("");
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [modalData, setModalData] = useState({ id: null, name: "", prompt: "" }); // State to store modal data

  const handleRenameButtonClick = (id, name) => {
    setEditingThreadId(id);
    setEditedThreadName(name);
  };

  const handleInputChange = (e) => {
    setEditedThreadName(e.target.value);
  };

  const handleRenameSubmit = () => {
    if (editedThreadName.trim() !== "") {
      props.onRenameThread(editingThreadId, editedThreadName);
      setEditingThreadId(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    }
  };

  const handleUpdateButtonClick = (id, name, prompt) => {
    setModalData({ id, name, prompt }); // Set data for the modal
    setOpenModal(true); // Open the modal
    console.log("I am clicked")
    console.log(openModal)
    console.log(modalData)
  };

  const handleUpdateSubmit = (id, name, prompt) => {
    props.onUpdateThread(id, name, prompt);
    setOpenModal(false); // Close the modal after submitting
  };

  return (
    <React.Fragment>
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
              >
                <ThreadMenu 
                  onDeleteThread={props.onDeleteThread}
                  id={value["id"]}
                  name={value["name"]}
                  prompt={value["prompt"]}
                  onRenameThread={handleRenameButtonClick}
                  onUpdateThread={handleUpdateButtonClick}
                />
              </IconButton>
            }
          >
            <ListItemButton 
              selected={value.id === props.currThread} 
              onClick={() => props.onSelectThread(value.id)}
            >
              {editingThreadId === value.id ? (
                <input 
                  type="text" 
                  value={editedThreadName} 
                  onChange={handleInputChange} 
                  onBlur={handleRenameSubmit}
                  onKeyDown={handleKeyPress}
                />
              ) : (
                <ListItemText 
                  id={labelId} 
                  primary={
                    <Typography 
                      variant="body1" 
                      sx={{ fontWeight: value.id === props.currThread ? '550' : '400' }}
                    >
                      {value.name}
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
      </List>
      {openModal && ( // Render the modal if openModal state is true
        <BasicModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          title={`Edit Thread  - ${modalData.name}`}
          content={modalData.prompt}
          // handleUpdateSubmit={() => handleUpdateSubmit(modalData.id, modalData.name, modalData.prompt)}
        />
      )}
    </React.Fragment>
    
  );
}
