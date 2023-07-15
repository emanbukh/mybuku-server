import express from "express";
import cors from "cors";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import logout from "./controller/auth/logout.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";
import editUser from "./controller/user/editUser.js";
import deleteUser from "./controller/user/deleteUser.js";
import resetUserPassword from "./controller/user/resetUserPassword.js";
import addBook from "./controller/book/addBook.js";
import editBook from "./controller/book/editBook.js";
import deleteBook from "./controller/book/deleteBook.js";
import viewBook from "./controller/book/viewBook.js";
import listAllBook from "./controller/book/listAllBook.js";

const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.get("/", checkStatus);
app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public route" })
);

// api auth
app.post(
  "/api/register",
  check("email").notEmpty().bail().isEmail().bail(),
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
  validatorResponse,
  register
);
app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  login
);

// private routes
app.get("/private", isAuthenticated, (req, res) =>
  res.status(200).json({ message: "Private route", user: req.user })
);
app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
  res.status(200).json({ message: "Admin route", user: req.user })
);

// api users
app.get("/api/users", isAuthenticated, listAll);
app.get("/api/users/:username", isAuthenticated, view);
app.put("/api/users/:username", isAuthenticated, editUser);
app.put(
  "/api/users/resetpassword/:username",
  isAuthenticated,
  resetUserPassword
);
app.delete("/api/users/:username", isAuthenticated, deleteUser);
app.put("/api/logout", isAuthenticated, logout);

// api books
app.post("/api/books/add", isAuthenticated, addBook);
app.put("/api/books/:id", isAuthenticated, editBook);
app.delete("/api/books/:id", isAuthenticated, deleteBook);
app.get("/api/books/:id", isAuthenticated, viewBook);
app.get("/api/books", isAuthenticated, listAllBook);

export default app;
