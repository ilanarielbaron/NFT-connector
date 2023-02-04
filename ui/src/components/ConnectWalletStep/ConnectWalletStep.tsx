import { Box, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import actionArrow from './action-arrow.svg';
import activeConnect from './active-connect.svg';

export const ConnectWalletStep = ()=>{
	const [isStepActive, setIsStepActive] = useState(true);
	const isWalletConnected = useAppSelector(selectWalletIsConnected);
	const wallet = useAppSelector(selectWallet);
	const isSigned = wallet?.messageSigned;

	const stepTitle = !isWalletConnected ? 'Connect your wallet' : !isSigned ? 'Sign a message' : wallet.address;
	const stepDescription = !isWalletConnected ? 'Start the whitelist process' : !isSigned ? 'Prove this is your wallet' : 'Wallet connected';
    
	if(isSigned) setIsStepActive(false);

	return (
		<>
			<Box sx={isStepActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{display:'flex'}}>
					<img src={activeConnect}/>
					<Box sx={{ml:'35px'}}>
						<Typography variant='h5'>{stepTitle}</Typography>
						<Typography  sx={{color: 'rgb(102 102 102)'}}>{stepDescription}</Typography>
					</Box>
				</Box>
			</Box>

			{isStepActive && (
				<Box bgcolor={'black'} sx={{display:'flex', justifyContent:'flex-end', padding:'15px', borderRadius:'0px 0px 8px 8px ', mb:'15px'}}>
					<Link href='#' underline='none'>
						<Typography variant='h5' color={'white'} sx={{display:'inline', mr:'15px'}}> CONNECT </Typography>
						<img src={actionArrow} alt="Action arrow" />
					</Link>
				</Box>
			) 
			}
		</>
	);
};