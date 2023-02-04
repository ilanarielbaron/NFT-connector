import { Box } from '@mui/material';
import { ConnectWalletStep } from '../ConnectWalletStep/ConnectWalletStep';
import { TwitterStep } from '../TwitterStep/TwitterStep';

export const Pipeline = () => {
	return (
		<Box>
			<ConnectWalletStep/>
			<TwitterStep/>
			<h2>Answer Questions</h2>
		</Box>
	
	);
};