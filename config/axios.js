import axios from "axios";

const Axios = axios.create({
  baseURL: "https://cloakify.herokuapp.com",
});

export default Axios;
