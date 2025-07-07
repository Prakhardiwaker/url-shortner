import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import { loginUser } from "../services/auth.service.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).send({ message: "Register Successfull" });
});

export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).send({ user: user, message: "Login Success" });
});

export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "logout success" });
});

export const get_current_user = wrapAsync(async (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
});
