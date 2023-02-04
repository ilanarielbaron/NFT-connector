import { Box, Grid, Link, Typography } from '@mui/material';
import { Pipeline } from '../Pipeline/Pipeline';
import backArrow from './back-arrow.svg';
import twitterIcon from './twitterIcon.svg';

export const Main = ()=>{

	return (
		<Box sx={{marginLeft:'3%'}}>
			<Box sx={{display: 'flex', justifyContent:'space-between'}}>
				<Box >
					<Link underline='none' variant='inherit' color={'black'} href="#" >		
						<img src={backArrow} alt="logo"/>
						<Typography variant='h5' sx={{ display:'inline', marginLeft:'5px'}}>BACK</Typography>
					</Link>
				</Box>
				<Link href="#">		
					<Box sx={{borderRadius:'8px', boxShadow:'rgb(0 0 0 / 10%) 0px 4px 40px', padding:'8px 15px 0px 15px'}}>
						<img src={twitterIcon} alt="twitter icon"/>
					</Box>
				</Link>
			</Box>
			<Box sx={{marginY:'80px'}}>
				<Grid container spacing={8}>
					<Grid item xs={6}>
						<Typography variant='h3' sx={{fontSize:'54px', lineHeight:'60px', mt:'-15px'}} >Genesis Dimensional Stones</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography sx={{opacity:'0.6', lineHeight:'20px', ml:'60px'}}>The most powerful relics in the multiverse – Genesis Dimensionals Stones have god like power – the ability to create and summon Dimensionals. Don’t miss your ticket into the most epic web3 adventure yet!</Typography>
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Pipeline/>
			</Box>
		</Box>
		
	);
};