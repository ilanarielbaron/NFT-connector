import { AppBar, Toolbar, Typography } from '@mui/material';
import { ConnectButton } from '../ConnectButton';

export const Header = () => (
	<AppBar
		position='static'
		color='default'
		elevation={0}
		sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
	>
		<Toolbar sx={{ flexWrap: 'wrap' }}>
			<Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
        Free NFT
			</Typography>
			<ConnectButton />
		</Toolbar>
	</AppBar>
);
