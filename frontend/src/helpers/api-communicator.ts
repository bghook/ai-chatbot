import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Login failed.");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", {
    name,
    email,
    password,
  });
  if (res.status !== 201) {
    throw new Error("Signup failed.");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Authentication failed.");
  }
  const data = await res.data;
  return data;
};

// Send a chat request to the backend, response will contain full list of chat messages from user
export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat.");
  }
  const data = await res.data;
  return data;
};

// Get all chat messages from the backend
export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to get chats.");
  }
  const data = await res.data;
  return data;
};

// Delete all chat messages from the backend
export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats.");
  }
  const data = await res.data;
  return data;
};

// Logout user
export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout.");
  }
  const data = await res.data;
  return data;
};
