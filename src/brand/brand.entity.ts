import mongoose from '../db';
import { PictureSchema } from '../picture/picture.entity';

const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: String,
    description: String,
    pictures: [PictureSchema],
    status: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Brand = mongoose.model('Brand', BrandSchema, 'brands');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "brands"})
// export class Brand {

//     @ObjectIdColumn()
//     _id: ObjectID | undefined;

//     @Column()
//     name: string;

//     @Column()
//     description: string | undefined;
    
//     @Column()
//     imageUrl: string | undefined;

//     @Column()
//     createUTC: Date;

//     @Column()
//     updateUTC: Date;
// }
