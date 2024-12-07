import { useState, useEffect } from "react";
import myApi from "../components/axios";
import Comment from "../components/comment";
import Like from "../components/like";
import { Link } from "react-router-dom";

function Notifications() {
  const [lock, setLock] = useState(false);
  const [likes, setLikes] = useState([]);

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
    const response = await myApi.post("/notification/comment", {
      withCredentials: true,
    });
  };

  const receiveMessage = async () => {
    const response = await myApi.post("/notification/message", {
      withCredentials: true,
    });
  };

  const receiveFollow = async () => {
    const response = await myApi.post("/notification/follow", {
      withCredentials: true,
    });
  };

  const unlock = () => setLock(true);

  useEffect(() => {
    receiveLike();
  }, []);

  return (
    <>
      <div>
        <Link to="/profile">Back</Link>
        <ul>
          {likes.map((like) => (
            like.likes.map((user, index) => (
              <li>
                <Link to="/otherUser">{user}</Link> 
                <Link to={`/viewPost?id=${like.id}`}> liked your post.</Link>
              </li>
            ))
          ))}
        </ul>
      </div>
    </>
  );
}

export default Notifications;
