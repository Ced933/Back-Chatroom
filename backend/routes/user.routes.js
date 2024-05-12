const express = require("express");
const {
  getUsers,
  setUsers,
  editUser,
  deleteUser,
  getOneUser,
} = require("../controllers/user.controllers");
// on va chercher la methode router
const router = express.Router();
// avoir les users
router.get("/", getUsers);
// avoir un user
router.get("/:id", getOneUser);
// creer un user
router.post("/", setUsers);
// modifier un user
router.put("/:id", editUser);
// supprimer un user
router.delete("/:id", deleteUser);

// on exports router pour qu'il soit accessible partout
module.exports = router;
