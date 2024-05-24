const UserModel = require("../models/user.model");

module.exports.getUsers = async (req, res) => {
  const posts = await UserModel.find();
  res.status(200).json(posts);
};

module.exports.getOneUser = async (req, res) => {
  const post = await UserModel.findById(req.params.id);
  res.status(200).json(post);
};

module.exports.setUsers = async (req, res) => {
  // si la request est vide s'il ny a pas de message
  console.log(req.body);
  //   if (!req.body.message) {
  //     res.status(400).json({ message: "Merci d'ajouter un user" });
  //   }

  const post = await UserModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(post);
};

module.exports.editUser = async (req, res) => {
  // on récupère l'id du post qu'on veut modifir
  console.log(req.params);
  res
    .status(200)
    .json({ message: "les infomations ont été modifié avec succès" });
  const post = await UserModel.findById(req.params.id);
  // si on recupère pas l'id on envoie un message d'erreur
  if (!post) {
    res.status(400).json({ message: "ce user n'existe pas" });
  }

  const updatePost = await UserModel.findByIdAndUpdate(post, req.body, {
    nex: true,
  });
  res.status(200).json(updatePost);
};

module.exports.deleteUser = async (req, res) => {
  const post = await UserModel.findById(req.params.id);

  if (!post) {
    res.status(400).json({ message: "ce user n'existe pas" });
  }

  await post.deleteOne();
  res.status(200).json("user supprimé");
};
