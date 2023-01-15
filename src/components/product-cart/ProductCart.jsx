import { useEffect, useState } from "react";
import {
  Modal,
  useMantineTheme,
  Image,
  Group,
  Flex,
  Title,
  Text,
  Button,
  Rating,
  Skeleton,
  SimpleGrid,
  Divider,
  Stack,
} from "@mantine/core";
import { ProductCard } from "../product-card/ProductCard";

export const ProductCart = ({
  isOpen,
  handleClose,
  cart = [],
  clickProduct,
  removeFromCart,
}) => {
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart?.forEach((product) => (total += product?.price));
    setSubTotal(total);
  }, [cart]);

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Product Cart"
      fullScreen
    >
      {cart.length > 0 ? (
        <>
          <SimpleGrid cols={3} spacing="lg" verticalSpacing="xl">
            {cart?.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                handleClick={clickProduct}
                inCart={true}
                removeProduct={removeFromCart}
              />
            ))}
          </SimpleGrid>
          <Divider my="3rem" label="Subtotal" />
          <Stack>
            {cart?.map((product) => (
              <SimpleGrid cols={2}>
                <Text>${product?.title}</Text>
                <Text>${product?.price}</Text>
              </SimpleGrid>
            ))}
            <Divider my="md" />
            <SimpleGrid cols={2}>
              <Text>------------</Text>
              <Text>${subTotal}</Text>
            </SimpleGrid>
            <Button
              mt="1rem"
              size="xl"
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </>
      ) : (
        "No items in cart"
      )}
    </Modal>
  );
};
