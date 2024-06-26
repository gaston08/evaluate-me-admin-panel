import { memo, forwardRef } from 'react';
import Box from '@mui/material/Box';
import { StyledScrollbar, StyledRootScrollbar } from './styles';

interface ScrollbarProps {
  children: node;
  sx: object;
}

const Scrollbar = memo(
  forwardRef(({ children, sx, ...other }: ScrollbarProps, ref) => {
    const userAgent =
      typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }),
);

export default Scrollbar;
