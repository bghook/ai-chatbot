import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// API request to get all users from the database
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get all users from the database
    const users = await User.find();
    return res.status(200).json({ message: "OK", users }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};

// Send some data along with a request to create a new user
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User signup
    const { name, email, password } = req.body; // Destructure name, email, and password from the request body
    const existingUser = await User.findOne({ email }); // Find a user with the email
    if (existingUser) return res.status(401).send("User already exists");
    const hashedPassword = await hash(password, 10); // Hash the password using bcrypt - this is a promise so need to await
    const user = new User({ name, email, password: hashedPassword }); // Create a new User models instance with the name, email, and hashed password
    await user.save(); // Save the new user to the database

    // Create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "https://ai-chatbot-bh.vercel.app",
      httpOnly: true,
      signed: true,
    }); // Remove previous cookie if user is logging in again

    /****************************************************************
     * TODO: Update domain after deploying to production
     * res.cookie("auth_token", token, {
      path: "/",
      domain: "github.io/deployed-app", <-- Update this
      expires,
      httpOnly: true,
      signed: true,
    });
     ****************************************************************/
    const token = createToken(user._id.toString(), user.email, "7d"); // Create a token for the user
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-bh.vercel.app",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};

// Send some data along with a request to login a user
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User login
    const { email, password } = req.body; // Destructure name, email, and password from the request body
    const user = await User.findOne({ email }); // Find a user with the email
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isPasswordCorrect = await compare(password, user.password); // Compare the password with the hashed password
    if (!isPasswordCorrect) {
      return res.status(403).send("Invalid email or password");
    }

    // Create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "https://ai-chatbot-bh.vercel.app",
      httpOnly: true,
      signed: true,
    }); // Remove previous cookie if user is logging in again

    /****************************************************************
     * TODO: Update domain after deploying to production
     * res.cookie("auth_token", token, {
      path: "/",
      domain: "github.io/deployed-app", <-- Update this
      expires,
      httpOnly: true,
      signed: true,
    });
     ****************************************************************/
    const token = createToken(user._id.toString(), user.email, "7d"); // Create a token for the user
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "https://ai-chatbot-bh.vercel.app",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};

// Verify user token and permissions
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id); // Find a user with the email
    if (!user) {
      return res.status(401).send("User not registered OR invalid token.");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions did not match.");
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};

// Logout user by clearing cookies
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id); // Find a user with the email
    if (!user) {
      return res.status(401).send("User not registered OR invalid token.");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions did not match.");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "https://ai-chatbot-bh.vercel.app",
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};
