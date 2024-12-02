import { useState } from "react";
import myApi from "../components/axios";
import { useNavigate } from "react-router-dom";

function Comment({ id }) {
  const [unlock, setLock] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [data, setData] = useState("");
  const [comments, setComments] = useState([]);
  const [render, setRender] = useState(false);

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

    const response = await myApi.post("/comment", [data, id], {
      withCredentials: true,
    });
    {
      console.log(response);

      setComments((prevComments) => [
        ...prevComments,
        { comment: data, user: response.data.username, id: response.data.id },
      ]);

      setData("");
    }
  };

  const deleteComment = async (e) => {
    const id = e.target.value;
    console.log(id);
    const response = await myApi.post("/comment/delete", [id], {
      withCredentials: true,
    });
    if(response.status === 200) {
      renderContent();
    }
  };


  const renderContent = () => {
    setRender(true);
  }
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
          {unlock && <button id={id}>Post</button>}
        </form>
      </div>

      
    </>
  );
}

export default Comment;
