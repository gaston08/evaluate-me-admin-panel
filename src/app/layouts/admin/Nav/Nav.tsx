import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { useResponsive } from 'app/hooks/use-responsive';

import Logo from 'app/components/Logo';
import Scrollbar from 'app/components/ScrollBar';

import { NAV } from '../config-layout';

import Account from './components/Account';
import Menu from './components/Menu';
//import Upgrade from './components/Upgrade';

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const { pathname } = useLocation();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Scrollbar
            sx={{
              height: 1,
              '& .simplebar-content': {
                height: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Logo sx={{ mt: 3, ml: 4 }} />
            <Account />
            <Menu />
            <Box sx={{ flexGrow: 1 }} />
            {/*<Upgrade />*/}
          </Scrollbar>
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          <Scrollbar
            sx={{
              height: 1,
              '& .simplebar-content': {
                height: 1,
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Logo sx={{ mt: 3, ml: 4 }} />
            <Account />
            <Menu />
            <Box sx={{ flexGrow: 1 }} />
            {/*<Upgrade />*/}
          </Scrollbar>
        </Drawer>
      )}
    </Box>
  );
}
