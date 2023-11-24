// Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Menu = () => {
  return (
    <AppBar position="center" style={{ width: '100%' }}>
      <Toolbar style={{ justifyContent: 'center' }}>
        <Button color="inherit">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Cadastro
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/todos-cadastros" style={{ color: 'inherit', textDecoration: 'none' }}>
            Todos Cadastros
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
