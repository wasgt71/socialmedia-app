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
    console.log(response);
   
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Find</button>
      </div>
    </>
  );
}

export default AllUsers;
