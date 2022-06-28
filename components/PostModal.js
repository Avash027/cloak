import { useEffect, useState } from "react";
import { Modal, Badge, ActionIcon, TextInput, Button } from "@mantine/core";
import { getSinglePost, insertComment } from "../api/post";
import { Heart, Message } from "tabler-icons-react";
import styles from "../styles/PostModal.module.css";

const PostModal = ({
  pid,
  setPid,
  loggedInUser,
  updateLikedPosts,
  likedPosts,
}) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    if (!pid || pid.length === 0) return;

    const fetch = async () => {
      setLoading(true);
      await getSinglePost(pid, setPost, setComments);
      setLoading(false);
    };
    fetch();
  }, [pid]);

  const addNewComment = async () => {
    setLoadingComment(true);
    await insertComment(
      post.pid,
      loggedInUser.uid,
      loggedInUser.profilePicURL,
      newComment,
      setComments
    );
    setLoadingComment(false);
  };

  const isLiked = likedPosts.includes(pid);

  return (
    <Modal
      size="xl"
      opened={pid.length > 0}
      onClose={() => setPid("")}
      loading={loading}
      overflowY="inside"
    >
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="post-modal">
          <div className="post-modal-header">
            <h2>{post.title}</h2>
            <img
              src={post.profilePicUrl}
              alt="profile pic"
              height="50px"
              width="50px"
              style={{ borderRadius: "50%", display: "inline" }}
            />
            <p style={{ display: "inline-block", marginLeft: "1rem" }}>
              {post.uid}
            </p>
            <div className="post-modal-header-info">
              <Badge>{post.collegeName}</Badge>
              <hr></hr>
              <p>{post.content}</p>
            </div>
          </div>
          <div className="post-modal-footer">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="post-modal-footer-likes"
                style={{ display: "flex", alignItems: "center" }}
              >
                <ActionIcon>
                  <Heart
                    onClick={() => updateLikedPosts(post.pid)}
                    fill={isLiked ? "red" : "transparent"}
                  ></Heart>
                </ActionIcon>
                <p>{post.likes}</p>
              </div>
              <div
                className="post-modal-footer-comments"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2rem",
                }}
              >
                <ActionIcon>
                  <Message></Message>
                </ActionIcon>
                <p>{comments.length}</p>
              </div>
            </div>
          </div>

          <div className="post-new-comment">
            <TextInput
              placeholder="Comment!!"
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
              rightSection={<Button onClick={addNewComment}>Post</Button>}
            ></TextInput>
          </div>

          <div className="post-modal-comments" style={{ overflow: "auto" }}>
            {comments.map((comment) => (
              <div className="post-modal-comment" key={comment.cid}>
                <div className={styles.postModalCommentInfo}>
                  <img
                    src={comment.profilePicUrl}
                    alt="profile pic"
                    className={styles.postModalImage}
                  />
                  <div className={styles.postModalContent}>
                    <h4>{comment.uid}</h4>
                    <p style={{ marginTop: "-1rem" }}>{comment.content}</p>
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

// const PostModal = ({ pid, setPid }) => {
//   const [post, setPost] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!pid || pid.length == 0) return;

//     const fetch = async () => {
//       setLoading(true);
//       await getSinglePost(pid, setPost);
//       setLoading(false);
//     };
//     fetch();
//   }, [pid]);

//   return (
//     <Modal opened={pid.length > 0} onClose={() => setPid("")}>

//     </Modal>
//   );
// };

export default PostModal;
