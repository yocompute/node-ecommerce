import {Document} from 'mongoose';
import { Request, Response } from "express";
import * as core from 'express-serve-static-core';
import SSE from "express-sse-ts";
// import { Connection, Repository, EntityTarget, FindManyOptions } from "typeorm";
import { IModelResult, Model } from './model';

export const Code = {
    SUCCESS: 'success',
    FAIL: 'fail'
}

export interface IControllerParams {
    // connection: Connection,
    sse?: SSE
}


export class Controller<T extends Document> {
    public model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * 
     * @param req 
     */
    getAuthToken(req: Request): string {
        const s: string = req.get("Authorization") || '';
        if (!s) {
            return '';
        } else if (s.indexOf('Bearer') !== -1) {
            return s.slice(7); // to remove 'Bear '
        } else {
            return s;
        }
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: core.Query = req.query;
        res.setHeader('Content-Type', 'application/json');

        try {
            const r: IModelResult<T[]> = await this.model.find(query);
            if(r.data){
                res.status(200).send(r);
            }else{
                res.status(403).send(r);
            }
        }catch(error){
            res.status(500).send({error: error.message});
        }
    }

    async insertOne(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            try {
                const r = await this.model.insertOne(d);
                if(r.data){
                    res.status(200).send(r);
                }else{
                    res.status(403).send(r);
                }
            }catch(error){
                res.status(500).send({error: error.message});
            }
        } else {
            res.status(400).send({error: 'No data in request'});
        }
    }

    async updateOne(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        const updates = { $set: Object.assign(Object.assign({}, req.body), { updateUTC: new Date() }) };

        res.setHeader("Content-Type", "application/json");
        if (updates) {
            try {
                const r: IModelResult<T>  = await this.model.updateOne({ _id: id }, updates);
                if(r.data){
                    res.status(200).send(r);
                }else{
                    res.status(403).send(r);
                }
            }catch(error){
                res.status(500).send({error: error.message});
            }
        } else {
            res.status(400).send({error: 'No data in request'});
        }
    }

    // /**
    //  * 
    //  * @param req 
    //  * @param res 
    //  */
    // async getById(req: Request, res: Response):Promise<void>  {
    //   const id = req.params.id;
    //   let data:any = {};
    //   let code = Code.FAIL;
    //   const options: any = ( req.query && req.query.options ) || {};

    //   res.setHeader('Content-Type', 'application/json');

    //   try {
    //     data = await this.model.findOne({_id: id}, null);
    //     code = Code.SUCCESS;
    //     res.send({ code, data });
    //   } catch (error) {
    //     // logger.error(`get error : ${error}`);
    //   } finally {
    //     res.send({ code, data });
    //   }
    // }
}