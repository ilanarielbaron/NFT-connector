import { memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Mint from '../../pages/Mint';

const RoutesComponent = () => {
	return (
		<BrowserRouter basename='/whitelist'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/mint' element={<Mint />} />
			</Routes>
		</BrowserRouter>
	);
};

export default memo(RoutesComponent);
