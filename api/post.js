import Axios from "../config/axios";
import Cookies from "js-cookie";

const authToken = Cookies.get("authToken");

export const createPost = async (title, content, showNotification) => {
  try {
    const { data } = await Axios.post(
      "/api/post",
      {
        content,
        title,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    showNotification({
      autoClose: 5000,
      title: "Great 👏",
      message: "Post created successfully",
      color: "green",
    });

    return data.rows;
  } catch (error) {
    showNotification({
      autoClose: 5000,
      title: "Oops 🤒",
      message: "Something went wrong",
      color: "red",
    });
  }
};

export const getPost = async (offset, limit, setPosts, postType) => {
  console.log(postType);
  try {
    let posts = { data: [] };

    if (postType === "my") {
      posts = await Axios.get(`/api/user/post/${offset}/${limit}`, {
        headers: {
          Authorization: authToken,
        },
      });
    } else if (postType === "likes") {
      posts = await Axios.get(`/api/likes/post/${offset}/${limit}`, {
        headers: {
          Authorization: authToken,
        },
      });
    } else if (postType === "bookmarks") {
      posts = await Axios.get(`/api/bookmarks/post/${offset}/${limit}`, {
        headers: {
          Authorization: authToken,
        },
      });
    } else {
      posts = await Axios.get(`/api/post/${offset}/${limit}`);
    }

    setPosts(posts.data);
  } catch (error) {
    console.error(error);
  }
};

export const updateLike = async (pid, isLike) => {
  try {
    await Axios.post(
      "/api/post/like",
      {
        pid,
        isLike,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateBookmarks = async (pid, isBookmarked) => {
  try {
    await Axios.post(
      "/api/post/bookmarks",
      {
        pid,
        isBookmarked,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePost = async (pid, setPost, setComments) => {
  try {
    const { data } = await Axios.get(`/api/singlepost/${pid}`);
    setPost(data);
    setComments(data.comments);
  } catch (error) {
    console.error(error);
  }
};

export const insertComment = async (
  pid,
  uid,
  profilePicUrl,
  content,
  setComments
) => {
  try {
    const { data } = await Axios.post(
      "/api/comment",
      {
        pid,
        content,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    setComments((comments) => [
      {
        cid: data.cid,
        content,
        uid,
        pid,
        profilePicUrl,
      },
      ...comments,
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (pid, showNotification) => {
  try {
    await Axios.delete(`/api/post/${pid}`, {
      headers: {
        Authorization: authToken,
      },
    });

    showNotification({
      autoClose: 5000,
      title: "Great 👏",
      message: "Post deleted successfully",
      color: "green",
    });
  } catch (error) {
    showNotification({
      autoClose: 5000,
      title: "Oops 🤒",
      message: "Something went wrong",
      color: "red",
    });
  }
};
