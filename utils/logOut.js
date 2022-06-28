import Cookies from "js-cookie";

export default function logOut() {
  Cookies.remove("authToken");
  window.location.href = "/";
}
