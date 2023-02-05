import { Box, Typography, Link, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount, selectTwitterIsLoading } from '../../store/twitterReducer';
import { selectWallet } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import inactiveTwitterIcon from './inactive-twitter.svg';
import activeTwitterIcon from './active-twitter.svg';
import { ConnectedSign } from '../ConnectedSign/ConnectedSign';

export const TwitterStep = () => {
	const wallet = useAppSelector(selectWallet);
	const twitterAccount = useAppSelector(selectAccount);
	const isLoading = useAppSelector(selectTwitterIsLoading);

	const isActive = wallet?.messageSigned && !twitterAccount?.isVerified;

	if (isLoading) {
		return (
			<Box sx={isActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<CircularProgress sx={{ marginTop: 5 }} />
			</Box>);
	};

	return (
		<Box sx={{mb: '15px'}}>
			<Box sx={isActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Grid container spacing={2} >
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex', overflow:'hidden' }}>
							<img src={isActive ? activeTwitterIcon : twitterAccount?.isVerified ? activeTwitterIcon : inactiveTwitterIcon } />
							<Box sx={{ ml: '35px', color: isActive ? '' : '#bbbbbb', overflow:'hidden' }}>
								<Typography variant='h6'>
									{'Follow '} 
									<Link href='https://twitter.com/DimensionalsRPG' target="_blank" rel="noopener" color="inherit">DimensionalsRPG</Link>
									{', and '}
									<Link href='https://twitter.com/SashaMackinnon' target="_blank" rel="noopener"  color="inherit">SashaMackinnon</Link>
								</Typography>
								<Typography >And connect your twitter</Typography>
							</Box>
						</Box>
					</Grid>

					{twitterAccount?.isVerified && (
						<Grid item xs={12} md={4}>
							<Box sx={{float:'right'}}>
								<ConnectedSign/>
							</Box>
						</Grid>
					)}
				</Grid>
			</Box>

			{isActive && (
				<StepActionBar step="TWITTER_STEP" />
			)}
		</Box>
	);
};