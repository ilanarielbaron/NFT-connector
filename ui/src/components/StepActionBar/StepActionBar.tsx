import { Box, Link } from '@mui/material';
import { ConnectButton } from '../ConnectButton';

interface StepActionBarProps {
	step: 'WALLET_STEP' | 'TWITTER_STEP' | 'QUESTION_STEP'
}

export const StepActionBar = ({ step }: StepActionBarProps) => {
	return (
		<Box bgcolor={'black'} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', borderRadius: '0px 0px 8px 8px ', mb: '15px' }}>
			<Link href='#' underline='none'>
				{step === 'WALLET_STEP' && <ConnectButton />}
			</Link>
		</Box>
	);
};


