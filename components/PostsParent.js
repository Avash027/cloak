import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import Post from "./Post";
import { deletePost, getPost } from "../api/post";
import PostModal from "../components/PostModal";

const PostsParent = ({
  updateLikedPosts,
  likedPosts,
  bookmarkedPosts,
  updateBookmarkedPosts,
  loggedInUser,
  postType,
}) => {
  const [activePage, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [pid, setPid] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      await getPost((activePage - 1) * 4, 4, setPosts, postType);
    };
    fetchPost();
  }, [activePage]);

  const handlePostDelete = async (pid) => {
    const newPosts = [...posts];
    let index = -1;

    newPosts.forEach((post, i) => {
      if (post.pid === pid) {
        index = i;
      }
    });

    if (index > -1) {
      newPosts.splice(index, 1);
      setPosts(newPosts);
      await deletePost(pid, showNotification);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Pagination page={activePage} onChange={setPage} total={10} />
        </div>
        Feed is empty
      </>
    );
  }

  return (
    <div>
      <PostModal
        pid={pid}
        setPid={setPid}
        loggedInUser={loggedInUser}
        updateLikedPosts={updateLikedPosts}
        likedPosts={likedPosts}
      ></PostModal>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Pagination page={activePage} onChange={setPage} total={10} />
      </div>

      {posts.map(
        ({
          pid,
          title,
          collegeName,
          content,
          uid,
          profilePicUrl,
          created_at,
          likesCount,
          toxicity,
        }) => (
          <Post
            key={pid}
            pid={pid}
            title={title}
            content={content}
            profilePicURL={profilePicUrl}
            collegeName={collegeName}
            authorName={uid}
            createdAt={new Date(created_at)}
            updateLikedPosts={updateLikedPosts}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            updateBookmarkedPosts={updateBookmarkedPosts}
            likesCount={likesCount}
            setPid={setPid}
            loggedInUser={loggedInUser}
            handlePostDelete={handlePostDelete}
            toxicity={toxicity}
          ></Post>
        )
      )}
    </div>
  );
};

export default PostsParent;
