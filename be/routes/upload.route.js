import { Router } from "express";
import uploadImgController from "../controller/uploadImg.controller.js";
import auth from "../middleware/auth.js"
import upload from "../middleware/multer.js";

const uploadRouter = Router();

uploadRouter.post("/upload", auth, upload.single('image') , uploadImgController)

export default uploadRouter;