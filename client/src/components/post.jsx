import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
e.preventDefault()

const postData = {
title,
message,
};

const response = fetch('http://localhost:3000/posts/new', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
});

navigate("/");
console.log(response);


}
  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title"></input>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message"></input>
      <button type="submit">SUBMIT</button>
      </form>
      </div>
    </>
  );
}


export default PostForm;