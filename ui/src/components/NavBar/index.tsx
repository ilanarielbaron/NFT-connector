import { AppBar, Link, Box, Typography, Grid } from '@mui/material';
import { ConnectButton } from '../ConnectButton';
import { NavBarAccordion } from '../NavBarAccordion/NavBarAccordion';

export const NavBar = () =>{
	return (
		<Box sx={{display: 'flex', flexDirection:'column', width:'15%', height: '80vh', justifyContent:'space-between'}} >
			<Box >
				<a>		
					<Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
						Free NFT
					</Typography>
				</a>
			</Box>
			<Box>
				<NavBarAccordion/>
			</Box>
			<Box>
				<ConnectButton/>
			</Box>
		</Box>
	);
};
