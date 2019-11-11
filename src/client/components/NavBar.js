// src/components/NavBar.js

import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
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
      {isAuthenticated && <Menu.Item as={Link} to="/create">Add A Pothole</Menu.Item>}
      {isAuthenticated && <Menu.Item onClick={() => logout()}>Log out</Menu.Item>}
    </div>
  );
};

export default NavBar;
