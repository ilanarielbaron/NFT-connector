import { Box, Link, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount } from '../../store/twitterReducer';
import { errorMessage, registerUser, selectUserIsRegistered } from '../../store/userReducer';
import { AnswerButton } from '../AnswerButton';
import CaptchaModal from '../Modal';
import { activeStepBoxStyles, inactiveStepBoxStyles } from '../Pipeline/PipelineStyles';
import inactiveTwitter from './inactive-questions.svg';
import { selectWallet } from '../../store/walletReducer';
import { finishRegistration } from '../../api/api';

const QUESTIONS = [
	{ id: 'game', question: 'What is your favorite role playing game?' },
	{ id: 'tv', question: 'What is your favorite tv show franchise?' },
	{ id: 'stream', question: 'Which streamers do you watch the most?' }
];

export const QuestionsStep = () => {
	const [answers, setAnswers] = useState<{ id: string, question: string, answer: string }[]>([]);
	const [open, setOpen] = useState(false);
	const captchaRef = useRef<ReCAPTCHA>(null);
	const isRegistered = useAppSelector(selectUserIsRegistered);
	const twitterAccount = useAppSelector(selectAccount);
	const address = useAppSelector(selectWallet)?.address;
	const dispatch = useAppDispatch();

	const isActive = !isRegistered && twitterAccount?.isVerified;

	const onClose = () => setOpen(false);

	const onChange = (id: string, question: string, value: string) => {
		setAnswers((prevAnswers) => {
			if (prevAnswers.find(answer => answer.id === id)) {
				return prevAnswers.map(prevAnswer => prevAnswer.id === id ? ({ id, question, answer: value }) : prevAnswer);
			}

			return [...prevAnswers, { id, question, answer: value }];
		});
	};

	const onSubmit = async () => {
		if (captchaRef.current) {
			const token = captchaRef.current.getValue();

			if (token && address) {
				const parsedValues = answers.map(({ question, answer }) => ({ question, answer }));
				const response = await finishRegistration(address, parsedValues);

				if (!response) {
					dispatch(errorMessage({ message: 'There is an error finishing the registration' }));
					onClose();

					return;
				}

				dispatch(registerUser());
				onClose();
			}
		}
	};

	return (
		<Box sx={{ mb: '15px' }}>
			<CaptchaModal values={answers} open={open} setOpen={setOpen} captchaRef={captchaRef} handleClose={onClose} onSubmit={onSubmit} />
			<Box sx={isActive ? { ...activeStepBoxStyles, display: 'block' } : inactiveStepBoxStyles}>
				<Box sx={{ display: 'flex' }}>
					<img src={inactiveTwitter} />
					<Box sx={{ ml: '35px', color: isActive ? '' : '#bbbbbb' }}>
						<Typography variant='h5'>Answer Questions</Typography>
						<Typography >Tell us about yourself</Typography>
					</Box>
				</Box>
				{isActive && (
					<Box display='flex' flexDirection='column' rowGap={2} m="20px">
						{QUESTIONS.map(question => {
							return (
								<TextField
									key={question.id}
									id={question.id}
									placeholder=""
									label={question.question}
									variant="standard"
									inputProps={{
										'aria-label': 'Description'
									}}
									onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
										const value = e.target.value;
										onChange(question.id, question.question, value);
									}}
									value={answers.find(answer => answer.id === question.id)?.answer ?? ''}
								/>
							);
						})}
					</Box>
				)}
			</Box>
			{isActive && (
				<Box bgcolor={'black'} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', borderRadius: '0px 0px 8px 8px ', mb: '15px' }}>
					<Link href='#' underline='none'>
						<AnswerButton setOpen={setOpen} />
					</Link>
				</Box>
			)}
		</Box>
	);
};
