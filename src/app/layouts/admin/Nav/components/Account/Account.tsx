import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};

export default function Account() {
  return (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );
}
