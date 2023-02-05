import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import actionArrow from './action-arrow.svg';
import { selectUserIsRegistered } from '../../store/userReducer';
import { selectAccount } from '../../store/twitterReducer';

interface Props {
	setOpen: (value: boolean) => void;
}


export const AnswerButton = ({ setOpen }: Props) => {
	const isRegistered = useAppSelector(selectUserIsRegistered);
	const twitterAccount = useAppSelector(selectAccount);

	const isActive = !isRegistered && twitterAccount?.isVerified;

	const onClick = async (): Promise<void> => {
		setOpen(true);

		return;
	};

	return (
		<Button
			variant='text'
			sx={{ color: 'white', fontSize: '24px', fontWeight: '400', p: 0 }}
			onClick={onClick}
		>
			{isActive && 'Submit & Register'}
			<img src={actionArrow} alt="Action arrow" style={{ marginLeft: '15px' }} />
		</Button>
	);
};
