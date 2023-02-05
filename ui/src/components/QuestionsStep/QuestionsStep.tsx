import { Box, Typography, Link } from '@mui/material';
import { useState } from 'react';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import actionArrow from './action-arrow.svg';
import inactiveTwitter from './inactive-questions.svg';

export const QuestionsStep = ()=>{
	const [activeStep, setActiveStep] = useState(false);

	return (
		<Box sx={{mb: '15px'}}>
		    <Box sx={activeStep ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{display:'flex'}}>
					<img src={inactiveTwitter}/>
					<Box sx={{ml:'35px', color: activeStep ? '' : '#bbbbbb'}}>
						<Typography variant='h5'>Answer Questions</Typography>
						<Typography >Tell us about yourself</Typography>
					</Box>
				</Box>
			</Box>

			{activeStep && (
			// TODO add StepActionBar component
				<Link href='#' underline='none'>
					<Box bgcolor={'black'} sx={{display:'flex', justifyContent:'flex-end', padding:'15px', borderRadius:'0px 0px 8px 8px '}}>
						<Typography variant='h5' color={'white'} sx={{display:'inline', mr:'15px'}}> CONNECT </Typography>
						<img src={actionArrow} alt="Action arrow" />
					</Box>
				</Link>
			) 
			}
		</Box>
	);
};