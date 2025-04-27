import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <Typography className="hover:cursor-pointer" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Mate
          </Typography>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
  );
}
