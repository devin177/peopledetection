import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography } from '@material-ui/core'

function Menu() {
  const [allLocations, setAllLocations] = useState([]);
	const [position, setPosition] = useState('Davis')

  function menuHandler(e) {
    setPosition(e)
  };

  return(
    <div>
      <Box height={100} padding={5}>
        <Typography variant='h3'>{position}</Typography>
      </Box>

      <Dropdown onSelect={menuHandler}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="Kemper Hall">Action</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Menu;
