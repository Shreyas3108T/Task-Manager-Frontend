export enum TaskPriority {
    LOW="LOW",
    MEDIUM="MEDIUM",
    HIGH="HIGH"
}

export enum TaskStatus {
    CREATED="CREATED",
    INPROGRESS="INPROGRESS",
    ONHOLD="ONHOLD",
    COMPLETED="COMPLETED"
}
export class Task{
    id:string;
    title:string;
    description:string;
    dueDate:Date;
    priority:TaskPriority; 
    assignedUser:Number;
    status:TaskStatus;
    projectId:string;


    constructor(id:string,title:string,description:string,dueDate:Date,priority:TaskPriority,assignedUser:Number,status:TaskStatus,projectId:string){
        this.id = id;
        this.title =title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.assignedUser = assignedUser;
        this.status = status;
        this.projectId = projectId;
    }
}