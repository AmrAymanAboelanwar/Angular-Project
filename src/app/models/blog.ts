import { User } from "./user";

export class Blog {
    constructor(
        public _id:String,
        public title:String,
        public body:String,
        public tags:String[],
        public img:String,
        public author:User,
        public createdAt:Date
    ){

    }
}
