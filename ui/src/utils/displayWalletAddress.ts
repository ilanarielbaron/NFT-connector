export const displayWalletAddress = (address = '') : string => {
	return `Hello, ${address.slice(0, 4)}...${address.slice(-4)} `;
};