import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import coinbaseModule from '@web3-onboard/coinbase';
import fortmaticModule from '@web3-onboard/fortmatic';

const fortmatic = fortmaticModule({
	apiKey: process.env.REACT_APP_FORTMATIC_KEY ?? '',
});

const injected = injectedModule();
const walletConnect = walletConnectModule();
const coinbaseWallet = coinbaseModule();

const initOnboard = init({
	wallets: [walletConnect, coinbaseWallet, injected, fortmatic],
	chains: [
		{
			id: '0x4',
			token: 'rETH',
			label: 'Ethereum Rinkeby Testnet',
			rpcUrl: 'https://eth-rinkeby.alchemyapi.io/v2/XRlytP2jPvNdTbWIbFY9nSXipaleRHF5',
		},
	],
	appMetadata: {
		name: 'Mint Dapp',
		icon: './favicon.ico',
		description: 'Mint Dapp',
		recommendedInjectedWallets: [
			{ name: 'MetaMask', url: 'https://metamask.io' },
			{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
		],
		agreement: {
			version: '1.0.0',
			termsUrl: 'https://www.blocknative.com/terms-conditions',
			privacyUrl: 'https://www.blocknative.com/privacy-policy',
		},
		gettingStartedGuide: 'https://blocknative.com',
		explore: 'https://blocknative.com',
	},
});

export { initOnboard };
