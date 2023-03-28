const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/mongoModels/usersModel.js");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users", UserModel);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dir, age, phone, avatar } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Por favor llenar todos los datos");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Usuario ya existe");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    dir,
    age,
    phone,
    avatar,
    cart: [],
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    token = generateToken(user._id);
    req.session.user = { uuid: "user-" + user._id };
    req.session.user.token = token;
    console.log(req.session);
    req.session.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send(req.session);
      }
    });
    //   .redirect(`back`);
  } else {
    res.status(400);
    throw new Error("Credenciales inválidas");
  }
});

const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: "matubianchi@gmail.com",
//     pass: "izxopsdqguskflhj",
//   },
// });

// async function postRegister(req, res) {
//   user = req.body;
//   user.cart = await [];
//   await ContUsers.save(user);
//   const mailOptions = {
//     from: "Servidor Node.js",
//     to: "dev.matiasbianchi@gmail.com",
//     subject: "Nuevo registro",
//     html: `<h1>Nuevo registro de Vortex</h1><br/><ul> <li>Usuario: ${user.username}</li> <li>Nombre: ${user.name}</li> <li>Edad: ${user.age}</li> <li>Dirección: ${user.dir}</li> <li>Teléfono: ${user.phone}</li> <li>Avatar: <img src="${user.avatar}"></li></ul>`,
//     // attachments: [{ path: "https://www.nationalgeographic.com.es/medio/2022/12/12/leon-1_b21b27e1_221212155936_1280x720.jpg"}]
//   };

//   try {
//     const info = transporter.sendMail(mailOptions);
//   } catch (err) {
//     console.log("error: ", err);
//   }

//   const { username, password } = await req.body;
//   req.session.user = username;
//   res.redirect("/");
// }

// module.exports = {
//   postRegister,
// };
