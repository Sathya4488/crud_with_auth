import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.token;
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token provided. Access denied.");
    return res.status(401).json({ message: "No token: Access denied" });
  }

  // Verify the token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token. Access denied.");
      return res.status(403).json({ message: "Invalid token: Access denied" });
    }

    console.log("Authenticated user payload:", user);

    // Attach user payload to request
    req.user = user;
    console.log("user", user);

    // Proceed to the next middleware or route handler
    next();
  });
};
