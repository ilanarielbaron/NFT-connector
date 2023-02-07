import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { initOnboard } from '../../utils/onboard';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
	PaperWrapper,
	ContractAddress,
	PaperHeadWrapper,
	StyledImg,
	ImgWrapper,
	ContentWrapper,
	ButtonWrapper,
	MintActionWrapper,
	PaperFoot,
	Pricing,
} from './styled';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const StyledPaper = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const Mint = () => {
	const [{ wallet }, connect, disconnect] = useConnectWallet();
	const connectedWallets = useWallets();

	const [onboard, setOnboard] = useState<any>(null);

	useEffect(() => {
		setOnboard(initOnboard);
	}, []);

	useEffect(() => {
		if (!connectedWallets.length) return;

		const connectedWalletsLabelArray = connectedWallets.map(
			({ label }) => label
		);
		window.localStorage.setItem(
			'connectedWallets',
			JSON.stringify(connectedWalletsLabelArray)
		);
	}, [connectedWallets]);

	useEffect(() => {
		if (!onboard) return;

		const previouslyConnectedWallets = JSON.parse(
			window.localStorage.getItem('connectedWallets') as string
		);

		if (!previouslyConnectedWallets?.length) return;

		async function setWalletFromLocalStorage() {
			await connect({
				autoSelect: {
					label: previouslyConnectedWallets[0],
					disableModals: true,
				},
			});
		}

		setWalletFromLocalStorage();
	}, [onboard, connect]);

	return (
		<ThemeProvider theme={darkTheme}>
			<Box
				sx={{
					p: 2,
					bgcolor: 'background.default',
					display: 'flex',
				}}
			>
				<Container maxWidth="sm">
					<PaperWrapper>
						<StyledPaper elevation={16} variant="outlined">
							<Box
								sx={{
									p: 2,
									bgcolor: 'action.selected',
								}}
							>
								<PaperHeadWrapper>
									{wallet && (
										<Button
											variant="outlined"
											disableElevation
											size="small"
											onClick={() =>
												disconnect({
													label: wallet.label,
												})
											}
										>
											Disconnect
										</Button>
									)}
								</PaperHeadWrapper>

								<ContentWrapper>
									<ImgWrapper>
										<StyledImg
											src={
												// Using placeholder images for now, to be replaced during integration
												wallet?.accounts[0]?.address
													? 'https://helios-i.mashable.com/imagery/articles/04tfuZxwA56wQUFcHkkCFWD/hero-image.fill.size_1200x1200.v1623367746.png'
													: 'https://via.placeholder.com/300'
											}
										/>
									</ImgWrapper>

									<MintActionWrapper>
										{wallet?.accounts[0]?.address && (
											<Pricing>
												<Typography
													component="p"
													variant="h6"
												>
													Free of charge
												</Typography>
											</Pricing>
										)}

										<ButtonWrapper>
											{/* Mint Button && Connect Wallet Button */}
											{wallet ? (
												<Button
													variant="contained"
													disableElevation
													size="large"
												>
													Mint
												</Button>
											) : (
												<Button
													variant="contained"
													disableElevation
													size="large"
													onClick={() => connect()}
												>
													Connect Wallet
												</Button>
											)}
										</ButtonWrapper>
									</MintActionWrapper>
								</ContentWrapper>

								{/* Contract Address */}
								{wallet?.accounts[0]?.address && (
									<PaperFoot>
										<ContractAddress>
											Explore Contract Address on
											Etherscan
										</ContractAddress>
										<Link
											component={RouterLink}
											to={`https://etherscan.io/address/${wallet?.accounts[0]?.address}`}
										>
											{wallet?.accounts[0]?.address}
										</Link>
									</PaperFoot>
								)}
							</Box>
						</StyledPaper>
					</PaperWrapper>
				</Container>
			</Box>
		</ThemeProvider>
	);
};

export default Mint;
