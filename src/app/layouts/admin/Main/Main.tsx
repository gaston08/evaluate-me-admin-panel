import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import { useScrollToTop } from 'app/hooks/use-scroll-to-top';
import { useResponsive } from 'app/hooks/use-responsive';
import Nav from '../Nav';
import Header from '../Header';
import { NAV, HEADER } from '../config-layout';

const SPACING = 8;

export default function Main() {
	const [openNav, setOpenNav] = useState<boolean>(false);
	const lgUp = useResponsive('up', 'lg');
	useScrollToTop();

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
				<Nav
					openNav={openNav}
					onCloseNav={() => {
						setOpenNav(false);
					}}
				/>

				<Box
					component="main"
					sx={{
						flexGrow: 1,
						minHeight: 1,
						display: 'flex',
						flexDirection: 'column',
						py: `${HEADER.H_MOBILE + SPACING}px`,
						...(lgUp && {
							px: 2,
							py: `${HEADER.H_DESKTOP + SPACING}px`,
							width: `calc(100% - ${NAV.WIDTH}px)`,
						}),
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</>
	);
}
