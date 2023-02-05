import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { displayWalletAddress } from '../../utils/displayWalletAddress';
import { ConnectedSign } from '../ConnectedSign/ConnectedSign';
import { activeStepBoxStyles, inactiveStepBoxStyles, stepDescriptionStlyes } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import activeConnect from './active-connect.svg';


export const ConnectWalletStep = () => {
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);
	
	const stepTitle = !isWalletConnected ? 'Connect your wallet' : !wallet?.messageSigned ? 'Sign a message' : displayWalletAddress(wallet.address);
	const stepDescription = !isWalletConnected ? 'Start the whitelist process' : !wallet?.messageSigned ? 'Prove this is your wallet' : 'Wallet connected';
	

	return (
		<Box sx={{mb: '15px'}}>
			<Box sx={!wallet?.messageSigned ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Grid container spacing={2} >
					<Grid item xs={12} md={8}>
						<Box sx={{ display: 'flex' }}>
							<img src={activeConnect} />
							<Box sx={{ ml: '35px', overflow:'hidden'}}>
								<Typography variant='h6' >{stepTitle}</Typography>
								<Typography sx={stepDescriptionStlyes}>{stepDescription}</Typography>
							</Box>
						</Box>
					</Grid>
				
					{wallet?.messageSigned && (
						<Grid item xs={12} md={4}>
							<Box sx={{float:'right'}}>
								<ConnectedSign/>
							</Box>
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