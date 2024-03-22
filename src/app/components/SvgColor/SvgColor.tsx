import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface SvgColorProps {
  src: string;
  sx?: SxProps<Theme>;
}

const SvgColor = forwardRef(({ src, sx }: SvgColorProps, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
  />
));

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
