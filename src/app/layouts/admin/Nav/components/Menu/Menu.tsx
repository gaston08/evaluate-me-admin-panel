import Stack from '@mui/material/Stack';
import NavItem from './components/NavItem';

import navConfig from '../../../config-navigation';

interface navConfig {
	title: string;
	path: string;
	icon: React.Component;
}

export default function Menu() {
	return (
		<Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
			{navConfig.map((item: navConfig) => (
				<NavItem key={item.title} item={item} />
			))}
		</Stack>
	);
}
