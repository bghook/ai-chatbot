import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// 4 types of HTTP requests mainly used in backend development
// 1. GET - to fetch data from server, get data from the backend or database
// 2. PUT - to update data on server, modify or mutate data
// 3. POST - to send data to server, i.e. in response to a request from the client
// 4. DELETE - to delete data from server

// Generate endpoints so we can make some new requests
// First param is the endpoint, second param is the callback function
// First param "/" refers to a request on localhost:5000/, i.e. nothing after the slash indicates the root of the server
// Second param is the callback function, which takes in 3 parameters: req, res, next
// req (request) - if frontend or client has requested something, res (response) - our response if client requests something, next - middleware function
// This is a dynamic request which includes a parameter in the URL, allowing us to be more flexible with our requests compared to static requests
// app.delete("/user/:id", (req, res, next) => {
//   console.log(req.params.id);
//   return res.send("Hello");
// });

// Connection and listeners
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server running & connected to database")
    );
  })
  .catch((error) => console.log(error));
