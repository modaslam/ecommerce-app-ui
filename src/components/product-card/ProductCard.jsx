import {
  Card,
  Image,
  Text,
  Badge,
  Tooltip,
  Group,
  Rating,
  Button,
  Flex,
  AspectRatio,
} from "@mantine/core";

export const ProductCard = ({
  product,
  handleClick,
  inCart = false,
  removeProduct,
}) => {
  return (
    <div onClick={() => handleClick(product)}>
      <Tooltip label={product?.title}>
        <Card
          shadow="sm"
          p="lg"
          radius="md"
          withBorder
          style={{
            cursor: "pointer",
          }}
        >
          <Card.Section>
            <AspectRatio ratio={720 / 1080} sx={{ maxWidth: 300 }} mx="auto">
              <Image src={product?.image} height={300} alt={product?.title} />
            </AspectRatio>
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text lineClamp={1} weight={500}>
              {product?.title}
            </Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text lineClamp={1} size="sm" color="dimmed" ml="0.25rem">
            ${product?.price}
          </Text>
          <Rating value={product?.rating?.rate} fractions={3} readOnly />
          {inCart && (
            <Flex
              mih={50}
              mt="1rem"
              gap="lg"
              justify="flex-end"
              align="flex-end"
              direction="row"
              wrap="wrap"
            >
              <Button
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "red", deg: 35 }}
                onClick={() => removeProduct(product?.id)}
              >
                Remove from Cart
              </Button>
            </Flex>
          )}
        </Card>
      </Tooltip>
    </div>
  );
};
