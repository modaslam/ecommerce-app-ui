import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Box,
  Center,
  AppShell,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { login } = useAuth();
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values) => {
    login(values);
  };

  return (
    <AppShell>
      <Center style={{ height: "90vh" }}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mb="1rem"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Enter password"
            description="Password must include at least one letter, number and special character"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="lg">
            <Button type="submit" fullWidth>
              Login
            </Button>
          </Group>
        </form>
      </Center>
    </AppShell>
  );
};
