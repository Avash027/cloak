import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3030",
});

export default Axios;
