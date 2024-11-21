import myApi from "../components/axios";
import { useState } from "react";

function Follow({ username }) {
  const [followRequest, setFollowRequest] = useState();
  const [requestData, setRequestData] = useState([]);

  const handleFollow = async (e) => {
    const response = await myApi.post("/follow/requests", [username], {
      withCredentials: true,
    });
    console.log(username);
  };

  return (
    <>
      <div>
        <button username={username} onClick={handleFollow}>
          Follow
        </button>
      </div>
    </>
  );
}

export default Follow;
