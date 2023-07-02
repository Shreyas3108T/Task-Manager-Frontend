export class Project{
    id:string;
    name:string;
    owner:number;
    users:number[];

    constructor(id:string,name:string,owner:number,users:number[]){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.users = users;
    }
}