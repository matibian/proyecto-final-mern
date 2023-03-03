import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Icono from './Icono';
import Logo from '../Logo';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Avatar, Divider, Tooltip } from '@mui/material';



export default function NavBar() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate()


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));



  return (


    <AppBar position="static" style={{ background: "linear-gradient(to right, rgb(229 189 181 / 93%), rgb(201 160 155))" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
          <Typography
            variant="h5"
            noWrap
            className="titlealiarg"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            VORTEX
          </Typography>
          </Link>

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
              <MenuItem onClick={() => navigate(`category/Camisas`)}>
                <Typography textAlign="center">Camisas</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`category/Pantalones`)}>
                <Typography textAlign="center">Pantalones</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`category/Accesorios`)}>
                <Typography textAlign="center">Accesorios</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`/mis_pedidos`)}>
                <Typography textAlign="center">MIS PEDIDOS</Typography>
              </MenuItem>

            </Menu>
          <Link to="/">
            <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Button
              onClick={() => navigate(`category/Camisas`)}
              sx={{ my: 2, color: 'white', display: 'block', fontSize : "12px"  }}>
              Camisas
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem className='dividerNavbar' />  
            <Button
              onClick={() => navigate(`category/Pantalones`)}
              sx={{ my: 2, color: 'white', display: 'block' , fontSize : "12px"  }}>
              Pantalones
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem className='dividerNavbar'/>
            <Button
              onClick={() => navigate(`category/Accesorios`)}
              sx={{ my: 2, color: 'white', display: 'block', fontSize : "12px"   }}>
              Accesorios
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem className='dividerNavbar'/>
            <Button
              onClick={() => navigate(`/mis_pedidos`)}
              sx={{ my: 2, color: 'white', display: 'block', fontSize : "12px"   }}>
              ||MIS PEDIDOS||
            </Button>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
                <SearchBar/>
          </Search>
          <Box sx={{ display: 'flex', flexGrow: 0, paddingLeft: 2 }}>
            <Box>
              <Icono />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 0, margin: "0 20px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Cuenta</Typography>
                </MenuItem>
                
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};