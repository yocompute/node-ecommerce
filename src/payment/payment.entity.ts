import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';
import { IQrcode } from '../qrcode/qrcode.entity';

const { Schema } = mongoose;

export interface IPaymentItemAddition {
  product: IProduct,
  name: string,
  price: number,
  cost: number,
  saleTaxRate: number,
  purchaseTaxRate: number,
  quantity: number
}

export interface IPaymentItem {
  product: IProduct,
  price: number,
  cost: number,
  saleTaxRate: number,
  purchaseTaxRate: number,
  brand: IBrand,
  quantity: number,
  subTotal: number,
  saleTax: number,
  additions: IPaymentItemAddition[],
}

export interface IPayment extends Document {
  items: IPaymentItem[],
  note: string,
  subTotal: number,
  saleTax: number,
  total: number,
  status: string,
  user: IUser,
  qrcode: IQrcode,
  createUTC: Date,
  updateUTC?: Date,
}

const PaymentItemAdditionSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  cost: Number,
  saleTaxRate: Number,
  purchaseTaxRate: Number,
  quantity: Number
})

const PaymentItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  price: Number,
  cost: Number,
  saleTaxRate: Number,
  purchaseTaxRate: Number,
  quantity: Number,
  subTotal: Number,
  saleTax: Number,
  additions: [PaymentItemAdditionSchema],
})

const PaymentSchema = new Schema({
  items: [PaymentItemSchema],
  note: String,
  sutTotal: Number,
  saleTax: Number,
  total: Number,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  qrcode: { type: Schema.Types.ObjectId, ref: 'Qrcode' },
  createUTC: { type: Date, default: new Date() },
  updateUTC: Date,
})

export const Payment: MongooseModel<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema, 'payments');

