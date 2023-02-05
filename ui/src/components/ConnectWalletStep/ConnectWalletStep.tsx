import { Box, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import actionArrow from './action-arrow.svg';
import activeConnect from './active-connect.svg';

export const ConnectWalletStep = () => {
	const [isStepActive, setIsStepActive] = useState(true);
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);

	const stepTitle = !isWalletConnected ? 'Connect your wallet' : !wallet?.messageSigned ? 'Sign a message' : wallet.address;
	const stepDescription = !isWalletConnected ? 'Start the whitelist process' : !wallet?.messageSigned ? 'Prove this is your wallet' : 'Wallet connected';
	const actionName = !isWalletConnected ? 'CONNECT' : 'SIGN';

	return (
		<>
			<Box sx={isStepActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{ display: 'flex' }}>
					<img src={activeConnect} />
					<Box sx={{ ml: '35px' }}>
						<Typography variant='h5'>{stepTitle}</Typography>
						<Typography sx={{ color: 'rgb(102 102 102)' }}>{stepDescription}</Typography>
					</Box>
				</Box>
			</Box>

			{isStepActive && (
				<StepActionBar step="WALLET_STEP" />
			)
			}
		</>
	);
};