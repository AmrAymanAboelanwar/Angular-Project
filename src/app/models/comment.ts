import { Blog } from "./blog";
import { User } from "./user";

export class Comment {
    constructor(
        public _id:String,
        public img:String,
        public blog:Blog,
        public createdAt:Date,
        public author:User,
        public text:string,

    ){

    }
}
