import { AppBar, Link, Box, Typography, Grid } from '@mui/material';
import { ConnectButton } from '../ConnectButton';
import { NavBarAccordion } from '../NavBarAccordion/NavBarAccordion';
import logo from './logo.svg';

export const NavBar = () =>{
	return (
		<Box sx={{display: 'flex', flexDirection:'column', width:'15%', height: '80vh', justifyContent:'space-between'}} >
			<Box >
				<Link href="#">		
					<img src={logo} alt="logo"/>
				</Link>
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
