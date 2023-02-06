import { Box } from '@mui/material';
import { ConnectButton } from '../ConnectButton';
import { TwitterButton } from '../TwitterButton';

interface StepActionBarProps {
	step: 'WALLET_STEP' | 'TWITTER_STEP' | 'QUESTION_STEP'
}

export const StepActionBar = ({ step }: StepActionBarProps) => {
	return (
		<Box bgcolor={'black'} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', borderRadius: '0px 0px 8px 8px ' }}>
			{step === 'WALLET_STEP' && <ConnectButton />}
			{step === 'TWITTER_STEP' && <TwitterButton />}
		</Box>
	);
};
