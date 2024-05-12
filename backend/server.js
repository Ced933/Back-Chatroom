const { app, server } = require("./socket/socket");
// on fera appel a express grace à cette variable
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5002;
// reation du token
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:5002"],
//   },
// });
// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

// connexion a la base de donnée
connectDB();
// const app = express();

// pour avoir les message en temps reel
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// pour autoriser les donné a etre fetch en local cors
const cors = require("cors");
const userModel = require("./models/user.model");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methode: ["GET", "POST"],
    credentials: true,
  })
);
// req = les données qu'on envoie pour faire notre requette id,message,nom etc
// app.get("/post", (req, res) => {
//   res.json({ message: "voici les données" });
// });

// app.use(cookieParser());

// MIDDLEWARE permet de traiter les données de la request
// les deux ligne sont indispensable pour que notre requet post fonctionne
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pour les requetes post tu vas dans routes/post.routes
app.use("/post", require("./routes/post.routes"));
app.use("/user", require("./routes/user.routes"));

app.get("/login", function (req, res) {
  // let username = request.body.email;
  res.send("hello world");
});
app.post("/login", function (req, res) {
  const { email, password, id } = req.body;

  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      // bcrypt.compare(password, user.password, (err,response) =>{});
      if (user.password === password) {
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
          expiresIn: "1d",
        });

        res.status(200).json({
          status: "success",
          token,
          message: "Logged in successfully",
          user: {
            _id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
          },
        });
      } else {
        res.json("ce user n'exite pas");
      }
    } else {
      res.json("ce user n'est pas enregistré");
    }
  });
});

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("send_message", (data) => {
//     // tous les message que je reçois sauf les miens
//     socket.broadcast.emit("recieve_message", data);
//   });
// });

// au port 5000 notre backend sera lancé
server.listen(port, () =>
  console.log("Le serveur a démarré sur le port " + port)
);
