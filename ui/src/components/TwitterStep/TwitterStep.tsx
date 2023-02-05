import { Box, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import actionArrow from './action-arrow.svg';
import inactiveTwitter from './inactive-twitter.svg';

export const TwitterStep = ()=>{
	const [activeStep, setActiveStep] = useState(false);


	return (
		<>
		    <Box sx={activeStep ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{display:'flex'}}>
					<img src={inactiveTwitter}/>
					<Box sx={{ml:'35px', color: activeStep ? '' : '#bbbbbb'}}>
						<Typography variant='h5'>Follow <Link href='#' color="inherit">DimensionalsRPG</Link>, and <Link href="#" color="inherit">SashaMackinnon</Link>
						</Typography>
						<Typography >And connect your twitter</Typography>
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