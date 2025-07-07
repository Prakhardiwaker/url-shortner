import {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
} from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new ConflictError("User Already Exists.");
  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return { token, newUser };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmailAndPassword(email);
  if (!user) throw new Error("Invalid User Credentials");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new Error("Invalid User Credentials");

  const token = signToken({ id: user._id });
  return { token, user };
};
