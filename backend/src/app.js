import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import cors from "cors";

const app = express();

const whitelist = [
  "https://mern-crud-auth.vercel.app",
  "http://localhost:3000",
];

// Middleware personalizado para configurar CORS basado en la lista blanca
app.use((req, res, next) => {
  const origin = req.get("origin");
  console.log("The origin is :" + origin);

  if (whitelist.indexOf(origin) !== -1) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
});
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(studentRoutes);

export default app;
