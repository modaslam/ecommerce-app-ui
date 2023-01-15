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
  AspectRatio,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useFetchSingleProduct } from "../../apis/useProduct";

export const ProductModal = ({ productId, isOpen, handleClose, addToCart }) => {
  const theme = useMantineTheme();
  const { data: productData, isLoading } = useFetchSingleProduct(productId);

  useEffect(() => {
    if (!isLoading) console.log("Product Data is ", productData);
  }, [isLoading]);

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      centered
      size="lg"
      title="Product Details"
      overlayColor={theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      closeButtonLabel="Close Product Modal"
    >
      <Skeleton visible={isLoading}>
        <Carousel
          sx={{ maxWidth: 280 }}
          mx="auto"
          height={400}
          loop
          withIndicators
        >
          <Carousel.Slide>
            <AspectRatio ratio={720 / 1080} sx={{ maxWidth: 300 }} mx="auto">
              <Image
                src={productData?.image}
                height={300}
                alt={productData?.title}
              />
            </AspectRatio>
          </Carousel.Slide>
          {/* ...other slides */}
        </Carousel>
        <Group mt="1rem">
          <Title order={3} mr="1rem">
            {productData?.title}
          </Title>
          <Text mt="1rem" fz="xs" c="dimmed">
            Description:
          </Text>
          <Text mr="1rem">{productData?.description}</Text>
          <Flex
            mih={50}
            gap="xl"
            justify="flex-start"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Group>
              <Text fz="xs" c="dimmed">
                Price:
              </Text>
              <Text>${productData?.price}</Text>
            </Group>
            <Group mt="0.25rem">
              <Text fz="xs" c="dimmed">
                Rating:
              </Text>
              <Rating
                value={productData?.rating?.rate}
                fractions={3}
                readOnly
              />
            </Group>
          </Flex>
        </Group>
        <Flex
          mih={50}
          mr="1rem"
          gap="lg"
          justify="flex-end"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            onClick={() => addToCart(productData)}
          >
            Add to Cart
          </Button>
          <Button variant="gradient" gradient={{ from: "orange", to: "red" }}>
            Buy Now
          </Button>
        </Flex>
      </Skeleton>
    </Modal>
  );
};
