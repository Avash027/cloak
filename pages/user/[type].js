import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import PostsParent from "../../components/PostsParent";
import UploadPost from "../../components/UploadPost";
import { updateBookmarks, updateLike } from "../../api/post";
import { useRouter } from "next/router";

export function Index({ theme, setTheme, user }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [likedPosts, setLikedPosts] = useState(user.likedPosts);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(user.bookMarkedPosts);
  const [postType, setPostType] = useState("my");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setPostType(router.query.type);

    setLoading(false);
  }, [router.query.type]);

  const updateLikedPosts = async (pid) => {
    const newLikedPosts = [...likedPosts];
    const index = newLikedPosts.indexOf(pid);

    if (index > -1) {
      newLikedPosts.splice(index, 1);
      setLikedPosts(newLikedPosts);

      await updateLike(pid, false);
    } else {
      newLikedPosts.push(pid);
      setLikedPosts(newLikedPosts);

      await updateLike(pid, true);
    }
  };

  const updateBookmarkedPosts = async (pid) => {
    const newBookmarkedPosts = [...bookmarkedPosts];
    const index = newBookmarkedPosts.indexOf(pid);

    if (index > -1) {
      newBookmarkedPosts.splice(index, 1);
      setBookmarkedPosts(newBookmarkedPosts);
      await updateBookmarks(pid, true);
    } else {
      newBookmarkedPosts.push(pid);
      setBookmarkedPosts(newBookmarkedPosts);
      await updateBookmarks(pid, false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar
          setIsModalOpened={setIsModalOpened}
          theme={theme}
          setTheme={setTheme}
          uid={user.uid}
        ></Sidebar>
        <UploadPost
          isModalActive={isModalOpened}
          setIsModalActive={setIsModalOpened}
        ></UploadPost>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!loading && (
          <PostsParent
            updateLikedPosts={updateLikedPosts}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            updateBookmarkedPosts={updateBookmarkedPosts}
            loggedInUser={user}
            postType={postType}
          ></PostsParent>
        )}
      </div>
    </div>
  );
}

export default Index;
