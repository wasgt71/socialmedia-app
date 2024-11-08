import { useEffect, useState } from "react";

function DisplayPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(function (response) {
        return response.json();
      })

      .then(function (response) {
        setPosts(response)
        console.log(response);
      })

      .catch(function (err) {});
  }, []);

  return (
    <>
      <div>
        <ul>
          {posts.map((post) => {
            return (
              <>
                <li>{post.title}</li>
                <li>{post.message}</li>
              </>
            );
          })}
        
        </ul>
      </div>
    </>
  );
}

export default DisplayPosts;
