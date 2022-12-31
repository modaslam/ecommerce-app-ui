import { useEffect, useState } from "react";
import { useFetchProducts, useFetchAllCategories } from "../../apis/useProduct";
import {
  AppShell,
  Navbar,
  Button,
  Group,
  Header,
  Text,
  ScrollArea,
  Image,
  SimpleGrid,
  Checkbox,
  Divider,
  ActionIcon,
  Accordion,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons";
import { useAuth } from "../../hooks/useAuth";
import { ProductCard } from "../../components/product-card/ProductCard";

export const HomePage = () => {
  const theme = useMantineTheme();
  const { user, logout } = useAuth();
  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    refetch: refetchAllProducts,
  } = useFetchProducts();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchAllCategories();
  const [sortProduct, setSortProduct] = useState("asc");
  const [productList, setProductList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (!isLoadingAllProducts) setProductList(allProducts);
  }, [allProducts]);

  useEffect(() => {
    console.log();
  });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
        <Navbar width={{ base: 300 }}>
          <Navbar.Section mt="xs">{/* Header with logo */}</Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Accordion defaultValue="categories">
              <Accordion.Item value="categories">
                <Accordion.Control>Select Category</Accordion.Control>
                <Accordion.Panel>
                  {categories ? (
                    categories.map((category, index) => (
                      <Checkbox
                        key={index}
                        value={category}
                        label={capitalize(category)}
                        onChange={(event) => console.log(event.currentTarget.value)}
                      />
                    ))
                  ) : (
                    <Text>
                      Colors, fonts, shadows and many other parts are
                      customizable to fit your design needs
                    </Text>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Navbar.Section>
          <Divider mx="1rem" />
          <Navbar.Section mt="md">
            <Group>
              <Avatar color="cyan" radius="xl" ml="1rem">
                {user.username[0].toUpperCase()}
              </Avatar>
              <Text>{user.username}</Text>
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
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text>Ecommerce App</Text>
            <ActionIcon>
              <IconAdjustments size={18} />
            </ActionIcon>
          </div>
        </Header>
      }
    >
      {productList.length > 0 && (
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
          {productList.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </SimpleGrid>
      )}
    </AppShell>
  );
};
