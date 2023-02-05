import { Box, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount } from '../../store/twitterReducer';
import { selectUserIsRegistered } from '../../store/userReducer';
import { AnswerButton } from '../AnswerButton';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import { StepActionBar } from '../StepActionBar/StepActionBar';
import inactiveTwitter from './inactive-questions.svg';

export const QuestionsStep = () => {
	const isRegistered = useAppSelector(selectUserIsRegistered);
	const twitterAccount = useAppSelector(selectAccount);
	const [answers, setAnswers] = useState([]);

	const isActive = !isRegistered && twitterAccount?.isVerified;

	return (
		<Box sx={{ mb: '15px' }}>
			<Box sx={isActive ? activeStepBoxStyles : inactiveStepBoxStyles}>
				<Box sx={{ display: 'flex' }}>
					<img src={inactiveTwitter} />
					<Box sx={{ ml: '35px', color: isActive ? '' : '#bbbbbb' }}>
						<Typography variant='h5'>Answer Questions</Typography>
						<Typography >Tell us about yourself</Typography>
					</Box>
				</Box>
			</Box>

			{isActive && (
				<Box bgcolor={'black'} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', borderRadius: '0px 0px 8px 8px ', mb: '15px' }}>
					<Link href='#' underline='none'>
						<AnswerButton />
					</Link>
				</Box>
			)}
		</Box>
	);
};