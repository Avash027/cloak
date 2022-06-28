import {useRouter} from "next/router"
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
} from "@mantine/core";
import {
  Home2,
  User,
  Bookmark,
  Logout,
  Sun,
  MoonStars,
  Plus,
  Heart,
} from "tabler-icons-react";
import logOut from "../utils/logOut";


const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.white,
    opacity: 0.85,

    "&:hover": {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },

  active: {
    opacity: 1,
    "&, &:hover": {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

export function Sidebar({ theme, setTheme,setIsModalOpened }) {
  const router = useRouter();
  const { classes } = useNavbarStyles();



  const NavbarData = [
    { icon: Home2, label: "Home" ,href:"/home"},
    { icon: User, label: "Account",href:"/user/all"},
    { icon: Plus, label: "Post" ,onClick:()=>setIsModalOpened(true)},
    { icon:Bookmark , label:"Bookmarks" , href:`/user/bookmarks`},
    { icon:Heart , label:"Liked" , href:"/user/likes"},
  ];

  const links = NavbarData.map((link) => (
    <NavbarLink
      onClick={() => window.location.href = link.href}
      {...link}
      key={link.label}
      active={router.pathname === link.href}
    />
  ));

  return (
    <Navbar
      style={{position:"sticky",top:"0"}}
      width={{ base: 80 }}
      p="md"
      className={classes.navbar}
    >
      
      <Navbar.Section grow mt={50}>

        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          <NavbarLink icon = {theme === "dark" ? Sun : MoonStars} 
            onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}
            label={theme === "dark"?"Light mode":"Dark mode"}></NavbarLink>
          <NavbarLink icon={Logout} label="Logout" onClick={logOut} />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidebar;
