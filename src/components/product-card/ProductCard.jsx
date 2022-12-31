import {
  Card,
  Image,
  Text,
  Badge,
  Tooltip,
  Group,
  Rating,
} from "@mantine/core";

export const ProductCard = ({ product }) => {
  return (
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
          <Image src={product?.image} height={220} alt={product?.title} />
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
      </Card>
    </Tooltip>
  );
};
