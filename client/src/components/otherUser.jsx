import { useState, useEffect } from "react";
import myApi from "../components/axios";

function OtherUser({ username }) {
  const [value, setValue] = useState();

  const displayUser = async () => {
    try {
      const response = await myApi.post("/otherUser/display", {
        withCredentials: true,
      });
      setValue(response.data.toString());
      console.log(value);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await myApi.post("/otherUser/remove", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Could not fetch user", error);
    }
  };
  return (
    <>
      <h1>{value}</h1>
      <button onClick={displayUser}></button>
      <p>hello world</p>
    </>
  );
}

export default OtherUser;
