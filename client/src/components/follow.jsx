import myApi from "../components/axios";
import { useState, useEffect } from "react";

function Follow({ username }) {
  const [lock, setLock] = useState(true);
  const [request, setRequest] = useState("Follow");

  //FUNCTION WORKS WHEN CONFIRM REQUEST AND CONFIRM FOLLOW ARE OFF
  // When user clicks follow button, username of user initial user requested to follow
  // is sent to server and added to database.
  
  const handleFollow = async () => {
    console.log(request);

      if (request === "Follow") {
      const response = await myApi.post("/follow", [username], {
        withCredentials: true,
      });
        setRequest("Following");
    
    } else {
      setRequest("Follow");
      console.log(request);
      const response = await myApi.post("/follow/remove", [username], {
        withCredentials: true,
      });
      setLock(true);
    }
  }
  


  const confirmFollow = async () => {
    console.log("hello");
    if (lock) {
      const response = await myApi.post("/follow/status", [username], {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRequest("Following");
      }
    }
  };

  const handleFunction = () => {
    setLock(false);
    handleFollow();
  };

  useEffect(() => {
    confirmFollow();
  }, [username]);
  

  return (
    <>
      <>
        <div>
          <button
            username={username}
            onClick={handleFunction}
            
          >
            {request}
          </button>
        </div>
      </>
    </>
  );
}

export default Follow;
