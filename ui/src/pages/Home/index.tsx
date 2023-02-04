import { Alert, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectErrorMessage, selectUserIsLoading } from '../../store/userReducer';
import { selectWalletIsConnected } from '../../store/walletReducer';

const Home = () => {
	const walletConnected = useAppSelector(selectWalletIsConnected);
	const isLoading = useAppSelector(selectUserIsLoading);
	const error = useAppSelector(selectErrorMessage);

	if (error) return <Alert severity='error'>{error}</Alert>;

	if (isLoading) return <CircularProgress sx={{ marginTop: 5 }} />;

	return <>{walletConnected && <h1>Free NFT</h1>}</>;
};

export default Home;