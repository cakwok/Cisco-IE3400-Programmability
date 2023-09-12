import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import axios from 'axios';  
import Services from "./service.js";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.corsOrigin,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
};
if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
  app.set("trust proxy", 1);
}

app.use(express.json());                             //use JSON as data representation
app.use(express.urlencoded({ extended: true }));     //convert "1/1" convention into non-uri path format
app.use(session(sessionOptions));

Services(app);

app.listen(process.env.PORT || 4000);