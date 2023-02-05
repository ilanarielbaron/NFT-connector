import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles, stepDescriptionStlyes } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import activeConnect from './active-connect.svg';

export const ConnectWalletStep = () => {
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);

	const stepTitle = !isWalletConnected ? 'Connect your wallet' : !wallet?.messageSigned ? 'Sign a message' : wallet.address;
	const stepDescription = !isWalletConnected ? 'Start the whitelist process' : !wallet?.messageSigned ? 'Prove this is your wallet' : 'Wallet connected';

	return (
		<Box sx={{mb: '15px'}}>
			<Box sx={!wallet?.messageSigned ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{ display: 'flex' }}>
					<img src={activeConnect} />
					<Box sx={{ ml: '35px', overflow:'hidden' }}>
						<Typography variant='h6'>{stepTitle}</Typography>
						<Typography sx={stepDescriptionStlyes}>{stepDescription}</Typography>
					</Box>
				</Box>
			</Box>

			{!wallet?.messageSigned && (
				<StepActionBar step="WALLET_STEP" />
			)
			}
		</Box>
	);
};