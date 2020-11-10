

import {Request, Response} from "express";
import { Controller, Code } from "../controller";
import { AuthModel } from "./auth.model";

export class AuthController extends Controller {
    authModel: any;

    constructor(model: AuthModel) {
        super(model);
        this.authModel = model;
    }

    async login(req: Request, res: Response): Promise<void> {
        const d = req.body;
        let code = Code.FAIL;
        let data = '';
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            const r = await this.authModel.login(d);
            res.send(r);
        } else {
            res.send({
                code,
                data,
                error: 'no data to save'
            })
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        const d = req.body;
        let code = Code.FAIL;
        let data = '';
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            const r = await this.authModel.signup(d);
            res.send(r);
        } else {
            res.send({
                code,
                data,
                error: 'no data to save'
            })
        }
    }
}