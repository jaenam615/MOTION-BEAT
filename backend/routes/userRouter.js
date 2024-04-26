import { Router } from "express";
import userController from "../controllers/userController.js"; 

const userRouter = Router();

//회원가입
userRouter.post("/signup", userController.createUser);

//로그인
userRouter.post("/login", userController.loginUser);

export default userRouter;