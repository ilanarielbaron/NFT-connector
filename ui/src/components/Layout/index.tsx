import * as React from 'react';
import { Container, CssBaseline, GlobalStyles, Box } from '@mui/material';

const Layout = ({ children }: { children: React.ReactElement }) => (
	<React.Fragment>
		<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
		<CssBaseline />
		<Box sx={{ display: 'flex', p:'4%'}}>
			<Container component='main'>
				{children}
			</Container>
		</Box>
	</React.Fragment>
);

export default React.memo(Layout);
