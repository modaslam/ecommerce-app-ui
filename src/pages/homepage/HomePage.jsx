import { useEffect, useState } from "react";
import { useFetchProducts, useFetchAllCategories } from "../../apis/useProduct";
import {
  AppShell,
  Navbar,
  Button,
  Group,
  Header,
  Text,
  Title,
  ScrollArea,
  Skeleton,
  SimpleGrid,
  Checkbox,
  Divider,
  Flex,
  ActionIcon,
  TextInput,
  Accordion,
  Indicator,
  Avatar,
  Menu,
  Switch,
  SegmentedControl,
  CloseButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAdjustments,
  IconFilter,
  IconUserCircle,
  IconSettings,
  IconTrash,
  IconAlertCircle,
  IconArrowBigTop,
  IconArrowBigDown,
  IconSearch,
  IconShoppingCart,
  IconEye,
} from "@tabler/icons";
import { useAuth } from "../../hooks/useAuth";
import { ProductCard } from "../../components/product-card/ProductCard";
import { ProductModal } from "../../components/product-modal/ProductModal";
import { ProductCart } from "../../components/product-cart/ProductCart";

const SORT_OPTIONS = [
  { label: "Name", value: "title" },
  { label: "Price", value: "price" },
  { label: "Category", value: "category" },
  { label: "Rating", value: "rate" },
];

const SEARCH_OPTIONS = [
  { label: "All", value: "__all__" },
  { label: "Name", value: "title" },
  { label: "Price", value: "price" },
  { label: "Category", value: "category" },
  { label: "Rating", value: "rate" },
];

export const HomePage = () => {
  const theme = useMantineTheme();
  const { user, logout } = useAuth();

  const [isSortDesc, setIsSortDesc] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
  const [searchBy, setSearchBy] = useState(SEARCH_OPTIONS[0].value);
  const [searchString, setSearchString] = useState("");
  const [productList, setProductList] = useState([]);
  const [accordionValue, setAccordionValue] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);

  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    refetch: refetchAllProducts,
  } = useFetchProducts();
  const { data: categories, isLoading: isLoadingCategories } =
    useFetchAllCategories();

  useEffect(() => {
    if (!isLoadingAllProducts) setProductList(allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (!allProducts) return;
    if (selectedCategories.length === 0) setProductList(allProducts);
    else
      setProductList(
        allProducts.filter((prevProduct) =>
          selectedCategories.includes(prevProduct?.category)
        )
      );
  }, [selectedCategories]);

  useEffect(() => {
    console.log("Product list: ", productList);
    console.log("Selected categories: ", selectedCategories);
  }, [productList]);

  const checkCategory = (category) => {
    if (selectedCategories.includes(category))
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((currentCategory) => currentCategory !== category)
      );
    else
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const searchProducts = (product) => {
    if (searchString?.length) {
      const lowSearch = searchString?.toLowerCase();
      const lowTitle = product?.title?.toLowerCase();
      const lowCategory = product?.category?.toLowerCase();
      const lowRating = product?.rating?.rate?.toString().toLowerCase();
      const lowPrice = product?.price?.toString().toLowerCase();

      switch (searchBy) {
        case "title":
          return lowTitle?.includes(lowSearch);
        case "price":
          return lowPrice?.includes(lowSearch);
        case "category":
          return lowCategory?.includes(lowSearch);
        case "rate":
          return lowRating?.includes(lowSearch);
        default:
          return (
            lowTitle?.includes(lowSearch) ||
            lowCategory?.includes(lowSearch) ||
            lowRating?.includes(lowSearch) ||
            lowPrice?.includes(lowSearch)
          );
      }
    }
    return true;
  };

  const addToCart = (product) => {
    setProductsInCart((prevCart) => [...prevCart, product]);
    setIsModalOpen(false);
  };

  const removeFromCart = (id) => {
    setProductsInCart((prevCart) =>
      prevCart.filter((product) => product?.id !== id)
    );
  };

  const sort = (productA, productB) => {
    if (isSortDesc) {
      // Swap productA and productB
      let tempProduct = productA;
      productA = productB;
      productB = tempProduct;
    }
    switch (sortBy) {
      case "title":
        return productA?.title.localeCompare(productB?.title);
      case "price":
        return productA?.price - productB?.price;
      case "category":
        return productA?.category.localeCompare(productB?.category);
      case "rate":
        return productA?.rating?.rate - productB?.rating?.rate;
      default:
        return productA?.id - productB?.id;
    }
  };

  const clickProduct = (product) => {
    console.log("Product clicked");
    setSelectedProductId(product?.id);
    setIsModalOpen(true);
  };

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
          <Navbar.Section my="md" mx="md" mt="xs">
            <Flex justify="space-between">
              <Text fz="lg" fw={500}>
                Filters
              </Text>
              <IconFilter color="teal" />
            </Flex>
          </Navbar.Section>
          <Divider />
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Accordion
              variant="separated"
              multiple={true}
              value={accordionValue}
              onChange={setAccordionValue}
            >
              <Accordion.Item value="search">
                <Accordion.Control>Search Product</Accordion.Control>
                <Accordion.Panel>
                  <TextInput
                    placeholder="Search"
                    icon={<IconSearch color="gray" size={14} />}
                    rightSection={
                      <CloseButton
                        aria-label="Close modal"
                        iconSize={14}
                        onClick={() => setSearchString("")}
                      />
                    }
                    value={searchString}
                    onChange={(event) =>
                      setSearchString(event.currentTarget.value)
                    }
                  />
                  <SegmentedControl
                    mt="1rem"
                    size="xs"
                    value={searchBy}
                    onChange={setSearchBy}
                    data={SEARCH_OPTIONS}
                  />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="sort">
                <Accordion.Control>Sort Product</Accordion.Control>
                <Accordion.Panel>
                  <SegmentedControl
                    value={sortBy}
                    onChange={setSortBy}
                    data={SORT_OPTIONS}
                  />
                  <Switch
                    mx="0.25rem"
                    mt="0.5rem"
                    label="Sort order"
                    labelPosition="left"
                    color={theme.colorScheme === "dark" ? "gray" : "dark"}
                    onLabel={
                      <IconArrowBigDown
                        size={16}
                        stroke={2.5}
                        color={theme.colors.cyan[4]}
                      />
                    }
                    offLabel={
                      <IconArrowBigTop
                        size={16}
                        stroke={2.5}
                        color={theme.colors.blue[5]}
                      />
                    }
                    checked={isSortDesc}
                    onChange={(event) =>
                      setIsSortDesc(event.currentTarget.checked)
                    }
                  />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="categories">
                <Accordion.Control>Select Category</Accordion.Control>
                <Accordion.Panel>
                  {categories ? (
                    categories.map((category, index) => (
                      <Checkbox
                        key={index}
                        value={category}
                        label={capitalize(category)}
                        onChange={(event) =>
                          checkCategory(event.currentTarget.value)
                        }
                      />
                    ))
                  ) : (
                    <>
                      <Skeleton height={8} radius="xl" mb="md" />
                      <Skeleton height={8} radius="xl" mb="md" />
                      <Skeleton height={8} radius="xl" />
                    </>
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
            <Title order={2} color="cyan">
              Ecommerce App
            </Title>
            <Flex
              mih={50}
              gap="md"
              justify="flex-end"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Indicator
                label={productsInCart?.length}
                inline
                size={22}
                showZero={false}
                overflowCount={10}
                withBorder
                dot={false}
              >
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <ActionIcon color="cyan">
                      <IconShoppingCart size={22} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconEye size={14} />}
                      onClick={() => setIsCartOpen(true)}
                    >
                      View Cart
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconTrash size={14} />}
                      onClick={() => setProductsInCart([])}
                    >
                      Clear Cart
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Indicator>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon color="cyan">
                    <IconAdjustments size={22} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Application</Menu.Label>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconUserCircle size={14} />}>
                    Profile
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Label>Data and Privacy</Menu.Label>
                  <Menu.Item icon={<IconAlertCircle size={14} />}>
                    Privacy Notice
                  </Menu.Item>
                  <Menu.Item color="red" icon={<IconTrash size={14} />}>
                    Delete Account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </div>
        </Header>
      }
    >
      {productList.length > 0 && (
        <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
          {productList
            ?.filter((product) => searchProducts(product))
            ?.sort((productA, productB) => sort(productA, productB))
            ?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                handleClick={clickProduct}
              />
            ))}
        </SimpleGrid>
      )}
      <ProductModal
        productId={selectedProductId}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        addToCart={addToCart}
      />
      <ProductCart
        isOpen={isCartOpen}
        handleClose={() => setIsCartOpen(false)}
        cart={productsInCart}
        clickProduct={() => {}}
        removeFromCart={removeFromCart}
      />
    </AppShell>
  );
};
