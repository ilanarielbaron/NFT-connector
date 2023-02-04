import { Box, Typography, Link } from '@mui/material';
import { useState } from 'react';
import actionArrow from './action-arrow.svg';
import activeConnect from './active-connect.svg';


export const ConnectWalletStep = ()=>{
	const [activeStep, setActiveStep] = useState(true);
    
	return (
		<>
			<Box sx={{border:'2px solid black', borderRadius:'8px 8px 0px 0px', padding:'30px'}}>
				<Box sx={{display:'flex'}}>
					<img src={activeConnect}/>
					<Box sx={{ml:'35px'}}>
						<Typography variant='h5'>Connect your wallet</Typography>
						<Typography  sx={{color: 'rgb(102 102 102)'}}>Start the whitelist process</Typography>
					</Box>
				</Box>
			</Box>

			{activeStep && (
				<Box bgcolor={'black'} sx={{display:'flex', justifyContent:'flex-end', padding:'15px', borderRadius:'0px 0px 8px 8px ', mb:'15px'}}>
					<Link href='#' underline='none'>
						<Typography variant='h5' color={'white'} sx={{display:'inline', mr:'15px'}}> CONNECT </Typography>
						<img src={actionArrow} alt="Action arrow" />
					</Link>
				</Box>
			) 
			}
		</>
	);
};