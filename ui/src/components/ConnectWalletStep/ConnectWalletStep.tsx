import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { displayWalletAddress } from '../../utils/displayWalletAddress';
import { ConnectedSign } from '../ConnectedSign/ConnectedSign';
import { activeStepBoxStyles, commonColors, inactiveDescriptionStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import { StepStatus } from '../Pipeline/StepStatus';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';

type ConnectWalletStepStatus = StepStatus | 'ACTIVE_CONNECT_WALLET' | 'ACTIVE_SIGN_MESSAGE';

export const ConnectWalletStep = () => {
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);

	const stepStatus: ConnectWalletStepStatus = !isWalletConnected ? 'ACTIVE_CONNECT_WALLET' : !wallet?.messageSigned ? 'ACTIVE_SIGN_MESSAGE' : 'INACTIVE_COMPLETED';
	
	let stepTitle = '';
	let stepDescription = '';
	let stepContainerStyles = {};

	switch(stepStatus){
	case 'ACTIVE_CONNECT_WALLET':
		stepTitle = 'Connect your wallet';
		stepDescription = 'Start the whitelist process';
		stepContainerStyles = activeStepBoxStyles;
		break;
	case 'ACTIVE_SIGN_MESSAGE':
		stepTitle = 'Sign a message';
		stepDescription = 'Prove this is your wallet';
		stepContainerStyles = activeStepBoxStyles;
		break;
	case 'INACTIVE_COMPLETED':
		stepTitle = displayWalletAddress(wallet?.address);
		stepDescription = 'Wallet connected';
		stepContainerStyles = inactiveStepBoxStyles;
		break;
	}
	
	return (
		<Box sx={{mb: '1rem'}}>
			<Box sx={stepContainerStyles}>
				<Grid container spacing={2} >
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex', alignItems:'center' }}>
							<WalletRoundedIcon sx={{fontSize: '5rem', color: commonColors.activeGreen}}/>
							<Box sx={{ ml: '2rem', overflow:'hidden'}}>
								<Typography variant='h6' >{stepTitle}</Typography>
								<Typography sx={inactiveDescriptionStyles}>{stepDescription}</Typography>
							</Box>
						</Box>
					</Grid>
				
					{wallet?.messageSigned && (
						<Grid item xs={12} md={4} sx={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
							<ConnectedSign/>
						</Grid>
					)
					}
				</Grid>
			</Box>

			{!wallet?.messageSigned && (
				<StepActionBar step="WALLET_STEP" />
			)
			}
		</Box>
	);
};