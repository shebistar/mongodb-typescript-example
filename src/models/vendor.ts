import { ObjectId } from "mongodb";

export default class Vendor {
    constructor(public nit: string, public dash: string, public digit: string, public name: string, public email: string, public id?: ObjectId) {}
   //constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}