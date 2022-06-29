import { useState } from "react";
import "../styles/globals.css";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/redirectUser";
import axios from "../config/axios";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");

  pageProps.setTheme = function (colorScheme) {
    setTheme(colorScheme);
  };

  pageProps.theme = theme;

  return (
    <MantineProvider
      {...pageProps}
      theme={{ colorScheme: theme, primaryColor: "red" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <ColorSchemeProvider {...pageProps}>
          <NextNProgress color="red"></NextNProgress>
          <Component {...pageProps} />
        </ColorSchemeProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { authToken } = parseCookies(ctx);

  let pageProps = {};
  const protectedRoutes =
    ctx.pathname === "/home" ||
    ctx.pathname === "/user/[type]" ||
    ctx.pathname === "/admin/users" ||
    ctx.pathname === "/admin/college";

  if (!authToken) {
    destroyCookie(ctx, "authToken");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: authToken,
        },
      });

      const { user } = data;

      if (user) !protectedRoutes && redirectUser(ctx, "/home");

      pageProps.user = user;
    } catch (error) {
      destroyCookie(ctx, "authToken");
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps };
};

export default MyApp;
