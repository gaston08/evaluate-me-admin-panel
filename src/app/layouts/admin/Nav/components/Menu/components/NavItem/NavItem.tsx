import { useLocation, Link as RouterLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

interface navConfig {
  title: string;
  path: string;
  icon: React.Component;
}

export default function NavItem({ item }: { item: navConfig }) {
  const { pathname } = useLocation();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      to={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
