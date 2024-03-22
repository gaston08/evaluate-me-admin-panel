import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'app/hooks/use-responsive';

import { bgBlur } from 'app/theme/css';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Searchbar from 'app/layouts/admin/components/SearchBar';
import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../components/AccountPopover';
import NotificationsPopover from '../components/NotificationsPopover';

interface HeaderProps {
  onOpenNav: () => void;
}

export default function Header({ onOpenNav }: HeaderProps) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {!lgUp && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        )}

        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
