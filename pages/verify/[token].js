import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { LoadingOverlay, Anchor } from "@mantine/core";
import { verifyUser } from "../../api/auth";

const Verify = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      await verifyUser(router.query.token, setIsLoading, setError, setSuccess);
    })();
  }, [router]);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <LoadingOverlay visible={isLoading} />
      {success.length !== 0 && <h2 align="center">{success}</h2>}
      {success.length !== 0 && (
        <h4 align="center">
          Go to{" "}
          <Anchor color="red" href="/login">
            Login page
          </Anchor>
        </h4>
      )}

      {error.length !== 0 && <h2 align="center">{error}</h2>}
    </div>
  );
};

export default Verify;
