type JoinRequest = {
    id:String;
    userId:String;
    projectId:String;
}

type AddJoinRequestForm = {
    projectId:String
}

type AcceptJoinRequestForm = {
    id:String
    projectId:String
}

type RefuseJoinRequestForm = {
    id:String
    projectId:String
}

