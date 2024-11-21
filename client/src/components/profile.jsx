import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";

function Profile() {
  const [user, setUser] = useState([]);
  const [lock, setLock] = useState(false);
  
  const onRender = async (e) => {
    const response = await myApi.post("/profile", {
      withCredentials: true,
    });
    console.log(response);
    setUser({
      username: response.data.username,
      followRequests: response.data.requests,
    });
  };
  useEffect(() => {
    onRender();
  }, []);

  const handleClick = () => {
    setLock(true);
  };


  const acceptFollower = async (e) => {
    let name = e.target.value; //Used let so upon click name data changes on render
    console.log(name);//And is always sent to server correctly
    const response = await myApi.post("/follow/requests/accept", [name], {
      withCredentials: true,
    });
  }
  
   const declineFollower = async (e) => {
    let name = e.target.value;
    console.log(name);
    const response = await myApi.post("/follow/requests/decline", [name], {
      withCredentials: true,
    })
   }

  return (
    <>
      <div>
        <h1>{user.username}</h1>
        <img id="profile-picture" />
        <button onClick={handleClick}>Follow Requests</button>

        {lock && (
          <>
            {user.followRequests.map((request) => (
              <div>
                <h4>{request} requested to follow you.</h4>
                <button value={request} onClick={acceptFollower}>Accept</button>
                <button value={request} onClick={declineFollower}>Decline</button>
              </div>
            ))}
          </>
        )}

        <button>Edit Profile</button>
      </div>
      <div>
        <Link to="/displayposts">Home</Link>
      </div>
      <div>
        <Link to="/post">Post</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </>
  );
}

export default Profile;
