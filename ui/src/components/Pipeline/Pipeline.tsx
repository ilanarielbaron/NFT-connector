import { Box } from '@mui/material';
import { ConnectWalletStep } from '../ConnectWalletStep/ConnectWalletStep';
import { QuestionsStep } from '../QuestionsStep/QuestionsStep';
import { TwitterStep } from '../TwitterStep/TwitterStep';

export const Pipeline = () => {
	return (
		<Box>
			<ConnectWalletStep/>
			<TwitterStep/>
			<QuestionsStep/>
		</Box>
	
	);
};