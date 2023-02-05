import { Box, Typography, Link, CircularProgress, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount, selectTwitterIsLoading } from '../../store/twitterReducer';
import { selectWallet } from '../../store/walletReducer';
import { activeDescriptionStyles, activeStepBoxStyles, activeTitleStyles, commonColors, inactiveDescriptionStyles, inactiveStepBoxStyles, inactiveTitleStyles } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ConnectedSign } from '../ConnectedSign/ConnectedSign';
import { StepStatus } from '../Pipeline/StepStatus';

export const TwitterStep = () => {
	const wallet = useAppSelector(selectWallet);
	const twitterAccount = useAppSelector(selectAccount);
	const isLoading = useAppSelector(selectTwitterIsLoading);
	const stepStatus: StepStatus = twitterAccount?.isVerified ? 'INACTIVE_COMPLETED' : wallet?.messageSigned ? 'ACTIVE' : 'INACTIVE_INCOMPLETE';

	const stepTitle = (<>
		{'Follow '}
		<Link href='https://twitter.com/DimensionalsRPG' target="_blank" rel="noopener" color={'inherit'}>DimensionalsRPG</Link>
		{', and '}
		<Link href='https://twitter.com/SashaMackinnon' target="_blank" rel="noopener" color="inherit">SashaMackinnon</Link>
	</>
	);
	const stepDescription = 'And connect your twitter';
	let stepContainerStyles = {};
	let iconColor = '';
	let stepDescriptionStlyes = {};
	let titleStyles = {};

	switch (stepStatus) {
	case 'ACTIVE':
		stepContainerStyles = activeStepBoxStyles;
		iconColor = commonColors.activeTwitter;
		stepDescriptionStlyes = activeDescriptionStyles;
		titleStyles = activeTitleStyles;
		break;
	case 'INACTIVE_INCOMPLETE':
		stepContainerStyles = inactiveStepBoxStyles;
		iconColor = commonColors.inactiveGray;
		stepDescriptionStlyes = inactiveDescriptionStyles;
		titleStyles = inactiveTitleStyles;
		break;
	case 'INACTIVE_COMPLETED':
		stepContainerStyles = inactiveStepBoxStyles;
		iconColor = commonColors.activeTwitter;
		stepDescriptionStlyes = activeDescriptionStyles;
		titleStyles = activeTitleStyles;
		break;
	}

	if (isLoading) {
		return (
			<Box sx={stepContainerStyles}>
				<CircularProgress sx={{ marginTop: 5 }} />
			</Box>);
	};

	return (
		<Box sx={{ mb: '15px' }}>
			<Box sx={stepContainerStyles}>
				<Grid container spacing={2} >
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<TwitterIcon sx={{ fontSize: '5rem', color: iconColor }} />
							<Box sx={{ ml: '35px', overflow: 'hidden' }}>
								<Typography variant='h6' sx={titleStyles}>{stepTitle}</Typography>
								<Typography sx={stepDescriptionStlyes}>{stepDescription}</Typography>
							</Box>
						</Box>
					</Grid>

					{twitterAccount?.isVerified && (
						<Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
							<ConnectedSign />
						</Grid>
					)}
				</Grid>
			</Box>

			{stepStatus === 'ACTIVE' && (
				<StepActionBar step="TWITTER_STEP" />
			)}
		</Box>
	);
};