import myApi from "../components/axios";
import { useState } from 'react';


function Follow() {
  const [followRequest, setFollowRequest] = useState(false);
  const [requestData, setRequestData] = useState([]);

  const followData = [
    {
      followRequest,
    },
  ];

  const handleFollow = async (e) => {
    setFollowRequest({ request: e.target.value });

    const response = await myApi.post("/follow", followData, {
      withCredentials: true,
    });
  };

  return (
    <>
    <div>
    <button value={user.username} onClick={handleFollow}>Follow</button>
    </div>
    </>
  )
}





export default Follow;
