import { useState, useEffect } from "react";
import myApi from "../components/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EditProfile() {
  const [username, setUsername] = useState([]);
  const [name, setName] = useState([]);
  const [bio, setBio] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const saveChanges = async (e) => {
    e.preventDefault();
    const response = await myApi.post("/editprofile", [username, name, bio], {
      withCredentials: true,
    });
    if(response.status === 200){
      console.log("request is good.");
      navigate("/profile");
    };
  };

  const userInfo = async () => {
    const response = await myApi.post("/editProfile/user", {
      withCredentials: true,
    });
    setUsername(response.data[0].username);
    setName(response.data[0].name);
    setBio(response.data[0].bio);

    setLoading(false);
    console.log(response.data);
  };

  useEffect(() => {
    userInfo();
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Link to="/profile">Back</Link>
      <form onSubmit={saveChanges}>
        <legend>username</legend>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          
        ></input>
        <legend>name</legend>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>
        <legend>bio</legend>
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
        ></input>
        <button>Save</button>
      </form>
    </>
  );
}

export default EditProfile;
