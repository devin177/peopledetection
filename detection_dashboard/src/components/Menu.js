import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography } from '@material-ui/core'

function Menu() {
  const [allLocations, setAllLocations] = useState(["Davis", "SF"]);
	const [position, setPosition] = useState('Davis')

  useEffect(() => {
    fetch('https://95e4xx7ty1.execute-api.us-west-1.amazonaws.com/hackdavis/livedata?type=dropdown', {
      method: "GET",
      headers: {
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((res) => res.json())
      .then((response) => {
      console.log(response);
      /*for (let i = 0; i < response.body; ++i) {
				// put stuff into the react state array
				setAllLocations(allLocations.concat(response.body[i]));
			}*/
    })
  }, []);


	/*createSelectItems() {
		let items = [];         
		for (let i = 0; i <= this.props.maxValue; i++) {             
			items.push(<option key={i} value={i}>{i}</option>);   
			//here I will be creating my options dynamically based on
			//what props are currently passed to the parent component
		}
		return items;
	}  
*/
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
          {allLocations.map(currentLoc => (
            <Dropdown.Item key={currentLoc}>{currentLoc}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Menu;
