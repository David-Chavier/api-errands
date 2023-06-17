import cors from "cors";
import express from "express";
import { UserController } from "./controllers/user.controller";
import * as dotenv from "dotenv";
import { ErrandsController } from "./controllers/errands.controller";
import { UserMiddleware } from "./middleware/user.middleware";
import { ErrandMiddleware } from "./middleware/errand.middleware ";
import { userRoutes } from "./routes/user.routes";
import { userLogin } from "./routes/login.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());
app.use("/login", userLogin());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app is running ${PORT}`);
});
