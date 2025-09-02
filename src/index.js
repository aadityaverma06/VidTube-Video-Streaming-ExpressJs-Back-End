import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./src/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Has Started on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Error"), err;
  });
