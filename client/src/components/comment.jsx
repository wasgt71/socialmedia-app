import { useState } from "react";
import myApi from "../components/axios";

function Comment() {
  const [unlock, setLock] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [data, setData] = useState("");
  const [comments, setComments] = useState([]);

const arr = [];

  const handleClick = () => {
    setLock(true);
    setShowButton(false);
    console.log("unlocked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLock(false);
    setShowButton(true);

    const commentData = {
      data,
    };

    const response = await myApi.post("/comment", commentData, {
      withCredentials: true,
    });
    {
      console.log(response);
     
      setComments((prevComments) => [
        ...prevComments,
        { comment: data, user: response.data.username },
      ]);

      setData("");
    }
  };

  return (
    <>
      <div>
        {showButton && <button onClick={handleClick}>Comment</button>}
        <form onSubmit={handleSubmit}>
          {unlock && (
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="text"
              placeholder="comment"
            ></input>
          )}
          {unlock && <button type="submit">Post</button>}
        </form>
        </div>

        <div>
          {comments.map((comment) => (
            <div>
              <h3>{comment.user}</h3>
              <p>{comment.comment}</p>
            </div>
          ))}
          
        </div>
    </>
  );
}

export default Comment;
