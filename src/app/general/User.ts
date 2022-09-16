export class User {
   constructor( 
    public id:number,
    public name:string,
    public username:string,
    public email:string,
    public role:string,
    public createdAt:Date,
    public updatedAt:Date
    ) {}
}