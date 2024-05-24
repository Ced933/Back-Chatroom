const PostModel = require("../models/post.model");

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find();
  res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
  // si la request est vide s'il ny a pas de message
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" });
  }

  const post = await PostModel.create({
    message: req.body.message,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  res.status(200).json(post);
};

module.exports.editPost = async (req, res) => {
  // on récupère l'id du post qu'on veut modifier
  const post = await PostModel.findById(req.params.id);
  // si on recupère pas l'id on envoie un message d'erreur
  if (!post) {
    res.status(400).json({ message: "ce post n'existe pas" });
  }

  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    nex: true,
  });
  res.status(200).json(updatePost);
};

module.exports.deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "ce post n'existe pas" });
  }

  await post.deleteOne();
  res.status(200).json("Message supprimé");
};
