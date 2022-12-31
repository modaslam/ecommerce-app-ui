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
import { useLogin } from "../../apis/useLogin";
import { useNotification } from "../../hooks/useNotification";

export const Login = () => {
  const { login } = useAuth();
  const { mutate: loginUser } = useLogin();
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (/^\S+$/.test(value) ? null : "Invalid username"),
    },
  });

  const handleSubmit = (values) => {
    console.log("values is : ", values);
    loginUser(values, {
      onSuccess: (data) => {
        login({ ...values, authToken: data?.data?.token });
        useNotification({
          type: "success",
          title: "Successful",
          message: `User ${values.username} has successfully logged in.`,
        });
      },
      onError: (error) => {
        console.log("error is : ", error);
        useNotification({ type: "error", message: error?.response?.data });
      },
    });
  };

  return (
    <AppShell>
      <Center style={{ height: "90vh" }}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mb="1rem"
            withAsterisk
            label="Username"
            placeholder="Enter username"
            {...form.getInputProps("username")}
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
