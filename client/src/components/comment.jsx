import { useState } from "react";

function Comment() {
const [unlock, setLock] = useState(false);
const [ showButton, setShowButton ] = useState(true);
const [ data, setData ] = useState("");

const handleClick = () => {
setLock(true);
setShowButton(false);
console.log("unlocked");
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  setLock(false);
  setShowButton(true);
  
const commentData = {
data,

};

const response = fetch('http://localhost:3000/comment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(commentData),
});

console.log(response);
 }


  return(
    <>
    <div>
        {showButton && (
        <button onClick={handleClick}>Comment</button>
        )}
        <form onSubmit={handleSubmit}>
        {unlock && (
        <input value={data} onChange={(e) => setData(e.target.value)} type="text" placeholder="comment"></input>
        )}
        {unlock && (
        <button type="submit">Post</button>
        )}
        </form>
    </div>
    </>
  )
  
}

export default Comment;