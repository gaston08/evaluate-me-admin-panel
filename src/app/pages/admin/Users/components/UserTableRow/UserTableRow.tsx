import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'app/components/Label';

import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserType } from 'app/shared/interfaces/user';
import { ColorEnum } from 'app/shared/interfaces/ui';

export default function UserTableRow({
  selected,
  user,
  handleClick,
}: {
  user: UserType;
  selected: boolean;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={user.name} src={user.avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {user.name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{user.email}</TableCell>

        <TableCell>{user.role}</TableCell>

        <TableCell>
          <Label color={ColorEnum.SUCCESS}>Activo</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Box sx={{ mr: 2 }}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Box>
          Editar
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Box sx={{ mr: 2 }}>
            <FontAwesomeIcon icon={faTrash} />
          </Box>
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
}
