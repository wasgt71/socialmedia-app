const express = require("express");
const postsRouter = express.Router();

let posts = [
  {
    id: "1",
    title: "about me",
    message: "Hey im robin",
    date: new Date(),
  },
  {
    id: "2",
    title: "about this journey",
    message: "hey im dave",
    date: new Date(),
  },
];

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

postsRouter.post("/new", (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res
      .status(400)
      .json({ error: "Both title and message are required." });
  }

  const newPost = { title, message };
  posts.push(newPost);

  console.log(posts);
  return res
    .status(201)
    .json({
      success: true,
      message: "Post created successfully!",
      data: newPost,
    });
});

module.exports = postsRouter;
