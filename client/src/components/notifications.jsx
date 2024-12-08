import { useState, useEffect } from "react";
import myApi from "../components/axios";
import Comment from "../components/comment";
import Like from "../components/like";
import { Link } from "react-router-dom";

function Notifications() {
  const [lock, setLock] = useState(false);
  const [likes, setLikes] = useState([]);
  const [follow, setFollow] = useState([]);
  const [message, setMessage] = useState([]);
  const [comments, setComments] = useState([]);

  let arr = [];

  const receiveLike = async () => {
    const response = await myApi.post("/notification/like", {
      withCredentials: true,
    });
    console.log(response.data);
    //response.data.forEach((dat) => {
    //arr.push(dat);
    //});

    setLikes(response.data);

    console.log(response.data);
    console.log(likes);
  };

  const receiveComment = async () => {
    const response = await myApi.post("/notification/comments", {
      withCredentials: true,
    });
    console.log(response.data);
    setComments(response.data);
  };

  const receiveMessage = async () => {
    const response = await myApi.post("/notification/message", {
      withCredentials: true,
    });
    console.log(response.data);
    setMessage(response.data);
  };

  const receiveFollow = async () => {
    const response = await myApi.post("/notification/follow", {
      withCredentials: true,
    });
    console.log(response.data);
    setFollow(response.data.followers);
  };

  const unlock = () => setLock(true);

  useEffect(() => {
    receiveLike();
    receiveFollow();
    receiveMessage();
    receiveComment();
  }, []);

  return (
    <>
      <div>
        <Link to="/profile">Back</Link>
        <ul>
          {likes.map((like) =>
            like.likes.map((user, index) => (
              <li>
                <Link to="/otherUser">{user}</Link>
                <Link to={`/viewPost?id=${like.id}`}> liked your post.</Link>
              </li>
            ))
          )}

          {follow.map((follower) => {
            return (
              <>
                <ul>
                  <Link to="/otherUser">{follower} started following you.</Link>
                </ul>
              </>
            );
          })}
        </ul>
        {message.map((messages) => {
          return (
            <ul>
              <Link to={`/otherUser?name=${messages.sender}`}>
                {messages.sender} left a message in your inbox.{" "}
                {messages.createdat}
              </Link>
            </ul>
          );
        })}

        {comments.map((comment) => {
          return (
         comment.comments.map((com) => {
          return (
            <ul>
            <Link to={`/viewPost?id=${com.postId}`}> {com.username} left a comment on your post.</Link>
            </ul>
          )
         })
        )
        })}
      </div>
    </>
  );
}

export default Notifications;
