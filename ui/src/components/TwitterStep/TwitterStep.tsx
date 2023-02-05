import { Box, Typography, Link, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount, selectTwitterIsLoading } from '../../store/twitterReducer';
import { selectWallet } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import inactiveTwitterIcon from './inactive-twitter.svg';
import activeTwitterIcon from './active-twitter.svg';

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
				<Box sx={{ display: 'flex' }}>
					<img src={isActive ? activeTwitterIcon : inactiveTwitterIcon} />
					<Box sx={{ ml: '35px', color: isActive ? '' : '#bbbbbb', overflow:'hidden' }}>
						<Typography variant='h6'>Follow <Link href='#' color="inherit">DimensionalsRPG</Link>, and <Link href="#" color="inherit">SashaMackinnon</Link>
						</Typography>
						<Typography >And connect your twitter</Typography>
					</Box>
				</Box>
			</Box>

			{isActive && (
				<StepActionBar step="TWITTER_STEP" />
			)}
		</Box>
	);
};