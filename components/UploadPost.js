import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  useMantineTheme,
  Textarea,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { createPost } from "../api/post";

const UploadPost = ({ isModalActive, setIsModalActive }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await createPost(title, content, showNotification);
    setLoading(false);
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      size="xl"
      opened={isModalActive}
      onClose={() => setIsModalActive(false)}
      title="Upload"
      overlayOpacity={0.2}
      overlayBlur={10}
      transition="fade"
      transitionDuration={1000}
      transitionTimingFunction="ease"
    >
      <TextInput
        placeholder="An Interesting Title"
        label="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      ></TextInput>

      <Textarea
        placeholder="Content"
        label="Content"
        required
        minRows={2}
        maxRows={4}
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      ></Textarea>

      <Button
        style={{ marginTop: "2rem" }}
        onClick={submit}
        loading={loading}
        fullWidth
      >
        {loading ? "Loading" : "Post"}
      </Button>
    </Modal>
  );
};

export default UploadPost;
