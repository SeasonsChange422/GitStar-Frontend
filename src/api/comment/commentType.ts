type Comment = {
    id:String;
    rootId:String;
    text:String;
    createTime:String;
}

type NewCommentForm = {
    rootId:String;
    text:String;
}