type Task = {
    id:String;
    title:String;
    closed:Boolean;
    createTime:String;
    type:String;
}

type NewTaskForm = {
    repositoryId:String;
    title:String;
}

type CloseTaskForm = {
    repositoryId:String;
    taskId:String;
    type:String;
}