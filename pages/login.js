import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { loginUser } from "../api/auth";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();
  const theme = useMantineTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [newUser, setNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginBtn = async (e) => {
    e.preventDefault();

    await loginUser(email, password, setIsLoading, setModalContent, router);
  };

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={modalContent && modalContent.length !== 0}
        onClose={() => setModalContent("")}
        title="Cloakify"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="xl"
      >
        <h4 align="center">{modalContent}</h4>
      </Modal>

      <Modal
        opened={newUser}
        onClose={() => setNewUser(false)}
        title="Cloakify"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="xl"
      >
        <h3 align="center">
          Hey! You can use this email and password to check the app
        </h3>
        <h4 align="center">test@iiit-bh.ac.in</h4>
        <h4 align="center">test123</h4>
      </Modal>

      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor color="red" href="/signup" size="sm">
            Create account
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          style={{ position: "relative" }}
        >
          <LoadingOverlay visible={isLoading} />
          <TextInput
            label="Email"
            placeholder="abcd@iiit-bh.ac.in"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Group position="apart" mt="md"></Group>
          <Button onClick={loginBtn} fullWidth mt="xl" color="red">
            Log In
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
