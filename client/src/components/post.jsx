import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import myApi from "../components/axios";

function PostForm() {
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    

    const response = myApi.post("posts/new", [user, caption], {
     withCredentials: true,
    });

    //navigate("/displayposts");
    console.log(response);
  };

  const onRender = async (e) => {
    const response = await myApi.post("/profile", {
      withCredentials: true,
    });
    console.log(response.data.username);
    setUser(
      response.data.username,
    );
  };
  useEffect(() => {
    onRender();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="caption"
          ></input>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      <div>
        <Link to="/displayposts">Home</Link>
      </div>
      <div>
        <Link to="/post">Post</Link>
      </div>
      <Link to="/profile">Profile</Link>
    </>
  );
}

export default PostForm;
