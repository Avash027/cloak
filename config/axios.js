import axios from "axios";

const Axios = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENV === "DEVELOPMENT"
      ? "http://localhost:2000"
      : "https://cloakify.herokuapp.com",
});

export default Axios;
