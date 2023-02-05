import { Box, Grid, Link, Typography } from '@mui/material';
import { Pipeline } from '../Pipeline/Pipeline';
import twitterIcon from './twitterIcon.svg';
import banner from './mino-banner.webp';

interface Props {
	userIsRegistered: boolean;
}

export const Main = ({ userIsRegistered }: Props) => (
	<Box sx={{ marginLeft: '3%' }}>
		<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<Link href="https://twitter.com/DimensionalsRPG" target="_blank" rel="noopener">
				<Box sx={{ borderRadius: '8px', boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 40px', padding: '8px 15px 0px 15px' }}>
					<img src={twitterIcon} alt="twitter icon" />
				</Box>
			</Link>
		</Box>
		<Box sx={{ marginY: '3rem' }}>
			{userIsRegistered && <img src={banner} style={{ maxWidth: '100%', borderRadius: '5px' }}></img>}
			<Grid container spacing={2} marginTop={10}>
				<Grid item xs={12} md={6}>
					<Typography variant='h3' sx={{ fontSize: '3rem', lineHeight: '60px', mt: '-15px' }} >{userIsRegistered && 'You are registered for '}Genesis Dimensional Stones</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography sx={{ opacity: '0.6', lineHeight: '20px' }}>The most powerful relics in the multiverse – Genesis Dimensionals Stones have god like power – the ability to create and summon Dimensionals. Don’t miss your ticket into the most epic web3 adventure yet!</Typography>
				</Grid>
			</Grid>
		</Box>
		<Box>
			{!userIsRegistered && <Pipeline />}
		</Box>
	</Box>
);
