import { useState } from "react";

function DisplayPosts() {
const [ posts, setPosts ] = useState({});

  fetch('http://localhost:3000/posts')
  .then(function(response) {
  return response.json();
  })

  .then(function(response) {
    const title = response[0].title;
    const message = response[0].message;
    setPosts({title, message});
    console.log(posts);
    })

  .catch(function(err) {
    
  });
  return (
    <>
    <div>
      <ul>
        <li>{posts.title}</li>
        <li>{posts.message}</li>
      </ul>
      </div>
    </>
  );
}



export default DisplayPosts;