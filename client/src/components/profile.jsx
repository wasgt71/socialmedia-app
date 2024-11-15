import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";

function Profile() {
const [ user, setUser ] = useState([]);

const onRender = async (e) => {
  const response = await myApi.post("/profile", {
    withCredentials: true,
  });
    console.log(response.data.username);
    setUser({userInfo: response.data.username })


}
useEffect(() => {
onRender();
}, []);


  return (
    <>
      <div>
        <h1>{user.userInfo}</h1>
        <img id="profile-picture"></img>
        <button>Edit Profile</button>
      </div>

      <div id="Posts"></div>

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

