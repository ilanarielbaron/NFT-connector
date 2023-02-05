import { Box, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles, stepDescriptionStlyes } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import actionArrow from './action-arrow.svg';
import activeConnect from './active-connect.svg';

export const ConnectWalletStep = () => {
	const [isStepActive, setIsStepActive] = useState(true);
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);

	const stepTitle = !isWalletConnected ? 'Connect your wallet' : !wallet?.messageSigned ? 'Sign a message' : wallet.address;
	const stepDescription = !isWalletConnected ? 'Start the whitelist process' : !wallet?.messageSigned ? 'Prove this is your wallet' : 'Wallet connected';


	return (
		<>
			<Box sx={isStepActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{ display: 'flex' }}>
					<img src={activeConnect} />
					<Box sx={{ ml: '35px', overflow:'hidden' }}>
						<Typography variant='h6'>{stepTitle}</Typography>
						<Typography sx={stepDescriptionStlyes}>{stepDescription}</Typography>
					</Box>
				</Box>
			</Box>

			{isStepActive && !wallet?.messageSigned && (
				<StepActionBar step="WALLET_STEP"/>
			) 
			}
		</>
	);
};