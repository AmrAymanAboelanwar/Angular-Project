export class User {
    constructor(public _id:String,public username:String,
        public Name:String,
        public password:String,
        public img:String,
        public email:String,
        public followers:User[],
        public following:User[],
        public createdAt:Date,
        ){
    }
}
