// src/components/NavBar.js

import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <Menu.Item
          onClick={() => loginWithRedirect({})
                    }
        >
                    Log in
        </Menu.Item>
      )}
      {isAuthenticated && <Menu.Item color="red" as={Link} to="/create">Report A Pothole</Menu.Item>}
      {isAuthenticated && <Menu.Item onClick={() => logout()}>Log out</Menu.Item>}
    </div>
  );
};

export default NavBar;
