import myApi from "../components/axios";
import { useState } from 'react';

function AllUsers() {
const [ users, setUsers ] = useState([]);

const userData = [
    {
        users,
    }
]

  const handleClick = async (e) => {
    const response = await myApi.post("/allusers", userData, {
      withCredentials: true,
    });
    setUsers(response.data);
    console.log(users);
   
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Find</button>
      </div>
      <div>
        {users.map((user) => {
          return(
            <>
            <p>{user.username}</p>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <button>Follow</button>
            </>
          )
        })}
      </div>
    </>
  );
}

export default AllUsers;
