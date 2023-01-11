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
} from "@mantine/core";
import { ProductCard } from "../product-card/ProductCard";

export const ProductCart = ({
  isOpen,
  handleClose,
  cart = [],
  clickProduct,
  removeFromCart,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title="Product Cart"
      fullScreen
    >
      {cart.length > 0 ? (
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
      ) : (
        "No items in cart"
      )}
    </Modal>
  );
};
