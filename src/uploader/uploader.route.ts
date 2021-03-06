import express, {Request, Router, Express} from "express";
import multer from "multer";
import { UploaderController } from "./uploader.controller";


const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, `${process.env.AWS_S3_PATH}/`);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, req.body.fname + "." + req.body.ext);
    },
});

const uploader = multer({ storage: storage });

  
export function UploaderRoute(): Router{
  const router = express.Router();

    router.post('/upload', uploader.single("file"), UploaderController.upload);

    return router;
}