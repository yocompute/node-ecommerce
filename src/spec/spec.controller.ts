import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { Code } from "../model";
import { UploaderModel } from "../uploader/uploader.model";
import { SpecModel } from "./spec.model";

export class SpecController extends Controller {
    specModel: SpecModel;
    constructor(model: SpecModel) {
        super(model);
        this.specModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.specModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }

}