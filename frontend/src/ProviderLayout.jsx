import React from 'react';
import ColorSchemeContext from './ColorSchemeContext';
import {
  DEFAULT_THEME,
  mergeMantineTheme,
  MantineProvider,
  createTheme,
  rem,
} from "@mantine/core";
import DrawerProvider from "./Contexts/drawerContext";
export default ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState('dark');
  const themeOverride = createTheme({
    fontFamily: "Verdana, sans-serif",
    white: "#FAFAFA",
    spacing: {
      xs: rem(4),
      sm: rem(8),
      md: rem(16),
      lg: rem(24),
      xl: rem(32),
    },
    titleFontSize: rem(32),
    cardHeight: rem(440),
    colorScheme: colorScheme,
  });
  return (
    <>
      <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
        <MantineProvider theme={mergeMantineTheme(DEFAULT_THEME, themeOverride)} withGlobalStyles withNormalizeCSS>
          <DrawerProvider>{children}</DrawerProvider>
        </MantineProvider>
      </ColorSchemeContext.Provider>
    </>
  );
};
