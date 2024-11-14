import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <>
      <div>
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
