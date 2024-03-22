import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import Nav from '../Nav';
import Header from '../Header';

export default function Main() {
	const [openNav, setOpenNav] = useState<boolean>(false);

	return (
		<>
			<Header />
			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
				}}
			>
				<Nav openNav={openNav} onCloseNav={() => { setOpenNav(false); }} />

				{/*<Main>{children}</Main>*/}
			</Box>
			<Outlet />
		</>
	);
}
