import { useState } from "react";

function PostForm() {

const handleSubmit = (e) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

const postData = {
title,
message,
};

const response = fetch('http://localhost:3000/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
});

console.log(response);


}
  return (
    <>
    <div>
      <form>
      <input value={title} placeholder="title"></input>
      <input value={message} placeholder="message"></input>
      <input></input>
      <button type="submit" onClick={handleSubmit}></button>
      </form>
      </div>
    </>
  );
}



export default PostForm;