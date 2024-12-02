import { useState, useEffect } from "react";
import myApi from "../components/axios";

function Like({ id }) {
  const [value, setValue] = useState("Like");

  const toggleLike = async () => {
    if (value === "Like") {
      await likePost();
    }
    if (value === "Liked") {
      await removeLike();
    }
  };

  const likePost = async () => {
    setValue("Liked");
    try {
      const response = await myApi.post("/like", ["Liked", id], {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Trouble liking post", error);
    }
  };

  const removeLike = async () => {
    setValue("Like");
    try {
      const response = await myApi.post("/like/remove", ["Liked", id], {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Trouble removing Like", error);
    }
  };

  const likeStatus = async () => {
    try {
      const response = await myApi.post("/like/status", [id], {
        withCredentials: true,
      });
      if (response.status === 200) {
        setValue("Liked");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    likeStatus()
  }, []);

  
  return (
    <>
      <div>
        <button id={id} type="submit" onClick={toggleLike}>
          {value}
        </button>
      </div>
    </>
  );
}

export default Like;
