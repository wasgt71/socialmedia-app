import myApi from "../components/axios";
import { useState, useEffect } from "react";

function Follow({ username }) {
  const [lock, setLock] = useState(true);
  const [request, setRequest] = useState("Follow");


// When user clicks follow button, username of user initial user requested to follow
// is sent to server and added to database.
  const handleFollow = async (e) => {
    setLock(false);
    const response = await myApi.post("/follow/requests", [username], {
      withCredentials: true,
    });
    console.log(username);
  };

  // Sends usernames to server to verify if initial user has requested to follow.
  const confirmRequest = async () => {
    console.log("hello");
    const response = await myApi.post("/follow/requests/requested", [username], {
      withCredentials: true,
    });

  // If initial user has requested to follow, server responds with status(200).
  // If status(200), request state is set to "Requested". UI displays "Requested" instead of "Follow".
    if (response.status === 200) {
      setRequest("Requested");
      console.log(request);
    }
  };

  const confirmFollow = async () => {
  const response = await myApi.post("/follow/requests/following", [username], {
  });

  if(response.status === 200) {
   setRequest("Following");
  }
  };

  useEffect(() => {
    confirmRequest();
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
