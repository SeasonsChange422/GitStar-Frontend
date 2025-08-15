type Tag = {
    id:String;
    name:String;
}

type NewTagForm = {
    name:String;
}

type DelTagForm = {
    id:String;
}

type ProjectTagForm ={
    tagId:String;
    projectId:String;
}