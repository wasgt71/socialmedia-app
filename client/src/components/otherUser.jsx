import { useState, useEffect } from "react";
import myApi from "../components/axios";
import Follow from "../components/follow";

function OtherUser() {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(true);

  const displayUser = async () => {
    try {
      const response = await myApi.post("/otherUser/display", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const username = response.data[0].username;
        const followers = response.data[0].followers.length;
        const following = response.data[0].following.length;
        setValue({ username, followers, following });
      }
    } catch (error) {
      console.error("Trouble fetching user data", error);
    }

    try {
      const response2 = await myApi.post("/otherUser/remove", {
        withCredentials: true,
      });

      if (response2.status === 200) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Trouble deleteing data from db", error);
    }
  };

  useEffect(() => {
    displayUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div>
        <h1>{value.username}</h1>
        <h3>{value.followers}</h3>
        <p>Followers</p>
        <h3>{value.following}</h3>
        <p>Following</p>
      </div>
      <Follow username={value.username}></Follow>
    </>
  );
}

export default OtherUser;
