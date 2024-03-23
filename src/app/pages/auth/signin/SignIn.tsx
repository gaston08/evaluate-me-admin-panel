import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'app/theme/css';

import Logo from 'app/components/Logo';

import {
  faGoogle,
  faFacebookF,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import From from './components/Form';

export default function LoginView() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <FontAwesomeIcon icon={faGoogle} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <From />
        </Card>
      </Stack>
    </Box>
  );
}
