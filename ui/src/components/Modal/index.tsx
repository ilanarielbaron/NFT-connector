import { useCallback, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { finishRegistration } from '../../api/api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet } from '../../store/walletReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { errorMessage, registerUser } from '../../store/userReducer';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	open: boolean;
	setOpen: (value: boolean) => void;
	values: { id: string, question: string, answer: string }[]
}

export default function CaptchaModal({ open, setOpen, values }: Props) {
	const handleClose = () => setOpen(false);
	const dispatch = useAppDispatch();
	const captchaRef = useRef<ReCAPTCHA>(null);
	const address = useAppSelector(selectWallet)?.address;

	const onChange = useCallback(async () => {
		if (captchaRef.current) {
			const token = captchaRef.current.getValue();

			if (token && address) {
				const parsedValues = values.map(({ question, answer }) => ({ question, answer }));
				const response = await finishRegistration(address, parsedValues);

				if(!response) {
					dispatch(errorMessage({message: 'There is an error finishing the registration'}));
					return;
				}

				dispatch(registerUser());
			}
		}
	}, [address, captchaRef, values, dispatch]);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h5">
						Prove you are real
					</Typography>
					<ReCAPTCHA onChange={onChange} sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ''} ref={captchaRef} />
				</Box>
			</Modal>
		</div>
	);
}