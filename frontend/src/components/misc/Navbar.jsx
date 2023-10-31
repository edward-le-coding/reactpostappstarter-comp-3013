import React from "react";
import classes from "./Navbar.module.css";
import { MantineLogo } from "@mantine/ds";
import { ActionIcon, Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import ColorSchemeContext from '../../ColorSchemeContext';

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const colorSchemeContext = React.useContext(ColorSchemeContext);
  const dark = colorSchemeContext.colorScheme === 'dark';

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <MantineLogo size={28} />
        {toggleDarkModeButton()}
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );

  function toggleDarkModeButton() {
    return <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
      title="Toggle color scheme"
    >
      {dark ? (
        <SunIcon style={{ width: 18, height: 18 }} />
      ) : (
        <MoonIcon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>;
  }
};

export default Navbar;
