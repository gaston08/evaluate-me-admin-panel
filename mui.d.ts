import '@mui/material/styles';
import { Palette, PaletteOptions, TypographyVariants } from '@mui/material';

interface MyPaletteExtensions {
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  text: {
    paper: string;
    default: string;
    neutral: string;
    secondary: string;
    primary: string;
  };
}

interface MyTypographyExtensions {
  fontWeightSemiBold: number;
}

interface MyPaletteExtensions extends Palette {}
interface MyPaletteExtensions extends PaletteOptions {}
interface MyTypographyExtensions extends TypographyVariants {}

declare module '@mui/material/styles' {
  interface Theme {
    palette: MyPaletteExtensions;
    customShadows: customShadowsInterface;
    typography: MyTypographyExtensions;
  }

  interface ThemeOptions {
    palette: MyPaletteExtensions;
    customShadows?: customShadowsInterface;
    typography: MyTypographyExtensions;
  }
}

interface customShadowsInterface {
  z1: string;
  z4: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  card: string;
  dropdown: string;
  dialog: string;
  primary: string;
  info: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
}
