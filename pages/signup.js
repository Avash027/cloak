import { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Modal,
  Button,
  Title,
  Text,
  Anchor,
  useMantineTheme,
} from "@mantine/core";

import useStyles from "../styles/signup.styles";

import { registerUser } from "../api/auth";

export function Signup() {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalContent, setModalContent] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await registerUser(email, password, setModalContent);
  };

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={modalContent.length !== 0}
        onClose={() => setModalContent("")}
        title="Cloakify"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="xl"
      >
        <h4 align="center">{modalContent}</h4>
      </Modal>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Create an account
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          required
          size="md"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          size="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button fullWidth mt="xl" size="md" color="red" onClick={submit}>
          Signup
        </Button>

        <Text align="center" mt="md">
          Already have an account?{" "}
          <Anchor href="/login" weight={700} color="red">
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default Signup;
