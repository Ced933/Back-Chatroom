const express = require("express");
const {
  setPosts,
  getPosts,
  editPost,
  deletePost,
} = require("../controllers/post.controllers");
// on va chercher la methode router
const router = express.Router();
// avoir les post
router.get("/", getPosts);
// creer un post
router.post("/", setPosts);
// modifier un post
router.put("/:id", editPost);
// supprimer un post
router.delete("/:id", deletePost);

// Géstion des like
// ajouter un like
router.patch("/like-post/:id", (req, res) => {
  res.json({ message: "Post liké : id : " + req.params.id });
});
// retirer un like
router.patch("/dislike-post/:id", (req, res) => {
  res.json({ message: "Post disliké : id : " + req.params.id });
});

// on exports router pour qu'il soit accessible partout
module.exports = router;
