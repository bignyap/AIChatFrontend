import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';

import "../../styles/LeftPane.css"
import UserService from '../../services/UserService';
import BasicModal from '../Common/Modal'
import {
  updateDefaultChatModel, getDefaultChatModel, 
  updateDefaultPrompt, getDefaultPrompt, getAllPrompts,
  createPrompt
} from '../../libraries/api'
import CreatePromptDialog from './CreatePrompt';

const pages = [
  { name: 'Chat', link: 'chat' },
  { name: 'Utility', link: 'utility' },
  { name: 'Contact', link: 'contact' }
];
const settings = ['Logout'];

const options = [
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo-1106',
  'gpt-4-turbo-preview',
  'gpt-4-1106-preview',
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = async () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className='main--content'>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="100%" minheight="100%">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link} // Use Link component here
              to="/" // Link to your home page
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              VARTALAP
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={handleCloseNavMenu} 
                    component={()=><Link to={page.link} />}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link} // Use Link component here
              to="/" // Link to your home page
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              VARTALAP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                flexGrow: 0,
                p: '2px 4px',
              }}
            >
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PromptListWithCreate />
                <ModelList />
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={UserService.getUsername()} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                
              </div>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting} 
                    onClick={() => { 
                      handleCloseUserMenu(); 
                      switchSettingAction(setting)
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </div>
  );
}


function switchSettingAction(setting) {
  if (setting === 'Logout') {
    UserService.doLogout();
  } else if (setting === 'Settings') {
    console.log("Opening settings modal...");
    <BasicModal 
      content="dfdsffdgf"
      title="dfdsf"
      open={true}
    />
  }
}


function ModelList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
      const fetchDefaultModel = async () => {
          const modelName = await getDefaultChatModel();
          if (modelName) {
              const index = options.indexOf(modelName);
              if (index === -1) {
                setSelectedIndex(1);
              }else{
                setSelectedIndex(index);
              }
          } else {
            setSelectedIndex(1);
          }
      };
      
      fetchDefaultModel();
  }, []);

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    await updateDefaultChatModel(options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
      >
        <ListItemButton
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={options[selectedIndex].toUpperCase()}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


function PromptListWithCreate() {
  
  const [openModal, setOpenModal] = React.useState(false); // State to control modal visibility
  const [listPrompts, setListPrompts] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
      const fetchDefaultPrompt = async () => {
          
          const allPrompts = await getAllPrompts();
          if (allPrompts.length > 0) {
            setListPrompts(allPrompts)
          }
          
          const defaultPrompt = await getDefaultPrompt();
          if (defaultPrompt) {
            const index = allPrompts.findIndex(obj => obj["id"] === defaultPrompt["id"]);
            setSelectedIndex(index)
          }
      };
      
      fetchDefaultPrompt();
  }, []); 

  const handleCreatePrompt = async (event, promptName, prompt) => {
    const response = await createPrompt(promptName, prompt);
    setListPrompts(prevThreads => 
      [
        {
          "id": response,
          "user_id": null,
          "name": promptName,
          "prompt": prompt
        }, 
        ...prevThreads
      ]
    )
  };

  return (
    <React.Fragment>
      <>
        <PromptList 
          setOpenModal={setOpenModal}
          listPrompts={listPrompts}
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </>
      {openModal && ( // Render the modal if openModal state is true
        <CreatePromptDialog
          open={openModal}
          handleClose={() => setOpenModal(false)}
          onSubmit={handleCreatePrompt}
        />
      )}
    </React.Fragment>
  )
}


function PromptList(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index, id) => {
    if (id === -1){
      props.setOpenModal(true)
    } else {
      props.setSelectedIndex(index);
      await updateDefaultPrompt(id);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    (props.listPrompts.length > 0) &&
    <div>
      <List
        component="nav"
        aria-label="Device settings"
      >
        <ListItemButton
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={props.listPrompts[props.selectedIndex]["name"]}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {[
          ...props.listPrompts, {
            "name": "Create another prompt...", 
            "id": -1, 
            "prompt": "Create a new prompt"
          }
        ].map((prompt, index) => (
          <MenuItem
            key={prompt["id"]}
            selected={index === props.selectedIndex}
            onClick={(event) => handleMenuItemClick(
              event, index, 
              (prompt["id"] === -1) ? -1 : props.listPrompts[index]["id"]
            )}
          >
            <Tooltip title = {prompt["prompt"]} placement="left">
              {prompt["name"]}
            </Tooltip>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}