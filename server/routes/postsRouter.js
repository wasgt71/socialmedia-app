const express = require("express");
const postsRouter = express.Router();

let posts = {
  1: {
    id: "1",
    title: "about me",
    message: "Hey im robin",
    date: new Date(),
  },
  2: {
    id: "2",
    title: "about this journey",
    message: "hey im dave",
    date: new Date(),
  },
};

postsRouter.get("/", (req, res) => {
  return res.json(Object.values(posts));
});

postsRouter.get("/:postId", (req, res) => {
  const post = posts[req.params.postId];
  if (post) {
    return res.json(post);
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

postsRouter.post('/posts', (req, res) => {
  const { title, message } = req.body;
  posts.push({ title, message });
  console.log(posts);
})

module.exports = postsRouter;
