import { useEffect, useState } from "react";
import { useFetchProducts } from "../../apis/useProduct";
import {
  AppShell,
  Navbar,
  Button,
  Group,
  Box,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  ScrollArea,
  Image,
  SimpleGrid,
  Tooltip,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";

export const HomePage = () => {
  const theme = useMantineTheme();
  const { user, logout } = useAuth();
  const { data: products } = useFetchProducts();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    console.log("Products are: ", products);
  }, [products]);

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbar={
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ base: 300 }}>
          <Navbar.Section mt="xs">{/* Header with logo */}</Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {/* Links sections */}
          </Navbar.Section>
          <Navbar.Section mt="md">
            <Group position="center">
              <Text>{user.email}</Text>
              <Button
                fullWidth
                radius="xs"
                size="lg"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={logout}
              >
                Logout
              </Button>
            </Group>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((open) => !open)}
                color={theme.colors.gray[6]}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Ecommerce App</Text>
          </div>
        </Header>
      }
    >
      {products && (
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
          {products.map((product) => (
            <Group key={product?.id} color={theme.colors.gray[6]} style={{cursor: "pointer"}}>
              <Image
                radius="md"
                src={product?.image}
                alt={product?.title}
                width={240}
                height={280}
              />
              <Stack spacing="xs">
                <Tooltip label={product?.title}>
                  <Text lineClamp={1}>{product?.title}</Text>
                </Tooltip>
                <Text lineClamp={1}>${product?.price}</Text>
              </Stack>
            </Group>
          ))}
          ;
        </SimpleGrid>
      )}
    </AppShell>
  );
};
