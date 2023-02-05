import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import ReCAPTCHA from 'react-google-recaptcha';

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
	values: { id: string, question: string, answer: string }[];
	handleClose: () => void;
	onSubmit: () => void;
	captchaRef: React.RefObject<ReCAPTCHA>;
} 

export default function CaptchaModal({ open, handleClose, onSubmit, captchaRef }: Props) {
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
					<ReCAPTCHA onChange={onSubmit} sitekey={process.env.REACT_APP_RECAPTCHA_KEY ?? ''} ref={captchaRef} />
				</Box>
			</Modal>
		</div>
	);
}
