import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR invalid token." });

    // Grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // Send all previous chats along with new chat to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// Send all chats to user
export const sendChatsToUser = async (
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

    return res.status(200).json({ message: "OK", chats: user.chats }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};

// Delete all chats
export const deleteChats = async (
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
    // @ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" }); // status 200: OK - send json object with users
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message }); // status 500: Internal Server Error - send json object with error message
  }
};
