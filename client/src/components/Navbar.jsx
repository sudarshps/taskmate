import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { Menu, MenuItem } from '@mui/material';
import useAuthStore from '../store/authStore';
import { useState } from 'react';

export default function Navbar() {
    const { isAuth, setAuth } = useAuthStore()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setAuth(false)
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
                        <Typography className="hover:cursor-pointer" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task Mate
                        </Typography>
                    </Link>
                    {!isAuth ? (<Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button color="inherit">Login</Button>
                    </Link>) : (
                        <>
                            <Button color="inherit" onClick={handleMenuOpen}>
                                <FaUserCircle className="text-3xl" />
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleMenuClose}>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() =>  handleMenuClose()}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
