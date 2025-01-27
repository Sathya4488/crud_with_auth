import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { TOKEN_SECRET } from "../config.js";

// Registrar nuevo usuario
export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Aseguras que la contraseña sea igual a confirmar contraseña
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(["Make sure the password and confirm password are correct"]);
    }
    // Encriptas la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Creas el usuario
    const newUser = new User({
      email,
      username,
      password: passwordHash,
    });

    // Guardas el usuario en la base de datos
    const userSaved = await newUser.save();

    // Creas el token (payload)
    const token = await createAccessToken({ id: userSaved._id });
    console.log("El token creado es : ", token);

    // Estableces en una cookie la respuesta
    res.cookie("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 86400000,
    });

    // Envias la respuesta
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log("Error trying to register new user :" + error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario en la base de datos
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res
        .status(400)
        .json({ message: "User not found, email not exist" });

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid password" });

    // Creas el token (payload)
    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    console.log("El token creado es :", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 86400000,
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
    // console.log(res.getHeaders()); // Debug response headers
  } catch (error) {
    console.log("Error trying to login :" + error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Token was deleted!" });
};

export const profile = async (req, res) => {
  const UserFound = await User.findById(req.user.id);

  if (!UserFound) {
    console.log("Usuario no encontrado");
    return res.status(400).json({ message: "User not found" });
  }
  console.log(
    "Usuario encontrado, estos son sus datos: " + JSON.stringify(res.json)
  );
  return res.json({
    id: UserFound._id,
    username: UserFound.username,
    email: UserFound.email,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(
    `Token obtained from cookies in req.cookies, auth.controller.js is: ${token}`
  );

  if (!token) {
    console.log("Unauthorized, No token");
    return res.status(401).json({ message: "Unauthorized, No token" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log("Error verifying token. Not authorized");
      return res.status(401).json({ message: "Unauthorized" }); // Removed `sendStatus`
    }

    // If the token is valid, find the user
    try {
      const userFound = await User.findById(user.id);
      if (!userFound) {
        console.log("Invalid token, Not authorized");
        return res
          .status(401)
          .json({ message: "Unauthorized, Token not valid" });
      }

      console.log("User found, token verified. User data: ", userFound);
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
