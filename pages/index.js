import React from "react";
import { Container, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/router";
import useStyles from "../styles/index.styles";

export function Index() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red", to: "pink" }}
              >
                safe, trusted community
              </Text>{" "}
              of students across globe.
            </Title>

            <Text className={classes.description} mt={30}>
              Connect with folks from universities across the globe. Share your
              stories, experiences and feedback{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red", to: "pink" }}
              >
                anonymously.
              </Text>
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "red", to: "pink" }}
              size="xl"
              className={classes.control}
              onClick={() => router.push("/login")}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Index;
