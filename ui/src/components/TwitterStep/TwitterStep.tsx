import { Box, Typography, Link } from '@mui/material';
import { useState } from 'react';
import actionArrow from './action-arrow.svg';
import inactiveTwitter from './inactive-twitter.svg';

export const TwitterStep = ()=>{
	const [activeStep, setActiveStep] = useState(false);


	return (
		<>
		    <Box sx={{border: '2px solid black', borderRadius: '8px 8px 0px 0px', padding:'30px'}}>
				<Box sx={{display:'flex'}}>
					<img src={inactiveTwitter}/>
					<Box sx={{ml:'35px'}}>
						<Typography variant='h5'>Follow Igor, DimensionalsRPG, and SashaMackinnon</Typography>
						<Typography  sx={{color: '#666666'}}>And connect your twitter</Typography>
					</Box>
				</Box>
			</Box>

			{activeStep && (
			// TODO crear un componente por separado de esto
				<Link href='#' underline='none'>
					<Box bgcolor={'black'} sx={{display:'flex', justifyContent:'flex-end', padding:'15px', borderRadius:'0px 0px 8px 8px '}}>
						<Typography variant='h5' color={'white'} sx={{display:'inline', mr:'15px'}}> CONNECT </Typography>
						<img src={actionArrow} alt="Action arrow" />
					</Box>
				</Link>
			) 
			}
		</>
	);
};