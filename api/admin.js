import axios from "../config/axios";
import Cookies from "js-cookie";

export const getAllUsers = async (setUsers, setError, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/api/admin/users", {
      headers: {
        Authorization: Cookies.get("authToken"),
      },
    });
    setLoading(false);
    setUsers(data);
  } catch (error) {
    setLoading(false);
    setError("There was an error");
  }
};

export const updateUser = async (verified, banned, admin, showNotification) => {
  try {
    const { data } = await axios.post(
      "/api/admin/user",
      { verified, banned, admin },
      {
        headers: {
          Authorization: Cookies.get("authToken"),
        },
      }
    );
    showNotification({
      autoClose: 5000,
      title: "Great 👏",
      message: "User details updated successfully",
      color: "green",
    });
  } catch (error) {
    console.error(error);
    showNotification({
      autoClose: 5000,
      title: "Oops 🤒",
      message: "Something went wrong",
      color: "red",
    });
  }
};

export const getColleges = async (setColleges, setError, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axios.get("/api/admin/colleges", {
      headers: {
        Authorization: Cookies.get("authToken"),
      },
    });
    setLoading(false);
    setColleges(data);
  } catch (error) {
    setLoading(false);
    setError("There was an error");
  }
};

export const addCollege = async (
  collegeName,
  collegeDomain,
  showNotification,
  setColleges
) => {
  try {
    const { data } = await axios.post(
      "/api/admin/college",
      { collegeName, domainName: collegeDomain },
      {
        headers: {
          Authorization: Cookies.get("authToken"),
        },
      }
    );
    showNotification({
      autoClose: 5000,
      title: "Great 👏",
      message: "College added successfully",
      color: "green",
    });
    setColleges((colleges) => [
      ...colleges,
      { college_name: collegeName, domain_name: collegeDomain },
    ]);
  } catch (error) {
    console.error(error);
    showNotification({
      autoClose: 5000,
      title: "Oops 🤒",
      message: "Something went wrong",
      color: "red",
    });
  }
};
