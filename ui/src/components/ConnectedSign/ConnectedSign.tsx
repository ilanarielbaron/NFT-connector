import { Box, Typography } from '@mui/material';
import greenCheck from './green-check.svg';

export const ConnectedSign = ()=>{

	return (
		<Box sx={{display:'flex', height:'1.5rem', alignItems:'center', alignContent:'center'}} >
			<img src={greenCheck} style={{height:'1.5rem'}} alt="connected"/>
			<Typography color={'#00d007'} sx={{ml:'5px'}}>Connected</Typography>
		</Box>
	);
};