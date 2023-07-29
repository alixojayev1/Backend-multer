import express from "express";
import "dotenv/config";
import multer from "multer";
import { userRout } from "./lib/crud.js";

const upload = multer({ dest: "./uploads" });


function myUser() {
  try {
    const expres = express();
    expres.use(express.json());
    expres.use(userRout)
  
    expres.listen(
      process.env["PORT"],
      process.env["LOCAL"],
      console.log("create server 5000")
    );
  } catch (error) {
     console.log(error);
  }
}
myUser()
