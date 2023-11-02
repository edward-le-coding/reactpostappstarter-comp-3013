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
  const [colorScheme, setColorScheme] = React.useState('light');
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
  });
  return (
    <>
      <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
        <MantineProvider theme={mergeMantineTheme(DEFAULT_THEME, themeOverride)} forceColorScheme={colorScheme} withGlobalStyles withNormalizeCSS >
          <DrawerProvider>{children}</DrawerProvider>
        </MantineProvider>
      </ColorSchemeContext.Provider>
    </>
  );
};
