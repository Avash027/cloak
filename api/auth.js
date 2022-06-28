import axios from "../config/axios";
import Cookies from "js-cookie";

export async function registerUser(email, password, setModalContent) {
  try {
    const { data } = await axios.post("/api/signup", {
      email,
      password,
    });
    setModalContent(data.message);
  } catch (error) {
    setModalContent(error.response.data.message);
  }
}

export async function verifyUser(token, setIsLoading, setError, setSuccess) {
  console.log(token);

  try {
    const { data } = await axios.get(`/api/verify/${token}`);
    setSuccess(data.message);
  } catch (error) {
    console.error(error);
    setError(error.response.data.message);
  }

  setIsLoading(false);
}

export async function loginUser(
  email,
  password,
  setIsLoading,
  setModalContent,
  router
) {
  try {
    setIsLoading(true);
    const { data } = await axios.post("/api/login", {
      email,
      password,
    });

    Cookies.set("authToken", data);
    setIsLoading(false);
    router.push("/home");
  } catch (error) {
    setIsLoading(false);
    setModalContent(error.response.data.message);
  }
}
