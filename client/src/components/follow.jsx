import myApi from "../components/axios";
import { useState, useEffect } from "react";

function Follow({ username }) {
  const [lock, setLock] = useState(true);
  const [request, setRequest] = useState("Follow");


  const handleFollow = async () => {
    console.log(request);
    if (request === "Follow") {
      try {
        const response = await myApi.post("/follow", [username], {
          withCredentials: true,
        });
        if (response.status === 200) {
          setRequest("Following");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setRequest("Follow");
      console.log(request);
      try {
        const response = await myApi.post("/follow/remove", [username], {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLock(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const confirmFollow = async () => {
    console.log("hello");
    if (lock) {
      try {
        const response = await myApi.post("/follow/status", [username], {
          withCredentials: true,
        });
        if (response.status === 200) {
          setRequest("Following");
          setLock(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    confirmFollow();
  }, []);

  return (
    <>
      <>
        <div>
          <button username={username} onClick={handleFollow}>
            {request}
          </button>
        </div>
      </>
    </>
  );
}

export default Follow;
