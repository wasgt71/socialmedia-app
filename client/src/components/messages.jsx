import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myApi from "../components/axios";
import Search from "../components/search";
import MessageBox from "../components/messagebox";

function Messages() {
  const [messageBox, setMessageBox] = useState([]);
  let arr = [];

  const inbox = async () => {
    const response = await myApi.post("/message/inbox", {
      withCredentials: true,
    });
    response.data[0].forEach((dat) => {
      arr.push({ userRec: dat.reciever });
    });
    response.data[1].forEach((dat) => {
      arr.push({ userSen: dat.sender });
    });

    const uniqueNames = new Set();

    const newArr = arr.filter((name) => {
      const value = name.userRec || name.userSen;
      if (!uniqueNames.has(value)) {
        uniqueNames.add(value);
        return true;
      }
      return false;
    });

    setMessageBox(newArr);
    console.log(newArr);
  };

  useEffect(() => {
    inbox();
  }, []);

  return (
    <>
      <Link to="/displayposts">Back</Link>
      <Search></Search>
      <Link to="/messagebox"></Link>
      {messageBox.map((message) => {
        return (
          <>
            <div>
            <Link to={`/messagebox?name=${message.userRec}`}>{message.userRec}</Link>
            </div>
            <div>
            <Link to={`/messagebox?name=${message.userSen}`}>{message.userSen}</Link>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Messages;
