import myApi from "../components/axios";
import { useState, useEffect } from "react";

function Follow({ username }) {
  const [lock, setLock] = useState(true);
  const [request, setRequest] = useState("Follow");

  const handleFollow = async (e) => {
    setLock(false);
    const response = await myApi.post("/follow/requests", [username], {
      withCredentials: true,
    });
    console.log(username);
  };

  const confirmRequest = async () => {
    console.log("hello");
    const response = await myApi.post("/follow/requests/requested", [username], {
      withCredentials: true,
    });

    if (response.status === 200) {
      setRequest("Requested");
      console.log(request);
    }

  };

  useEffect(() => {
    confirmRequest();
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
