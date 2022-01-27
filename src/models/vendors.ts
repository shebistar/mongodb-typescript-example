import { ObjectId } from "mongodb";

export default class Vendors {
    constructor(public nit: string, public dash: string, public digit: string, public name: string, public email: string, public id?: ObjectId) {}
}