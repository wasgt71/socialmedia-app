import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import myApi from "../components/axios";

function Search() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [query, setQuery] = useState("");
  const [lock, setLock] = useState(true);

  const users = async () => {
    let arr = [];
    const response = await myApi.post("/search", {
      withCredentials: true,
    });
    response.data.forEach((dat) => {
      arr.push(dat.username);
      setUserInfo(arr);
    });
    console.log(userInfo);
  };

  const searchUsers = async () => {
    if (!query) {
      setData([]);
      setLock(false);
      return;
    }
    setLock(true);
    let arr = [];
    const filterUsers = userInfo.filter((users) => users.includes(query));

    filterUsers.forEach((user) => {
      arr.push(user);
      setData(arr);
    });
  };
  useEffect(() => {
    searchUsers();
  }, [query]);

  useEffect(() => {
    users();
  }, []);

  return (
    <>
      <div>
        <input
          placeholder="Search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      <div>
        {lock &&
          data.map((userData) => {
            return (
              <>
                <div>
                  <p>{userData}</p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Search;
