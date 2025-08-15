type Feedback = {
    id:String;
    objectId:String;
    type:String;
    feedback:String;
    isRead:Boolean;
    userId:String;
}

type NewFeedbackForm = {
    feedback:String;
    objectId:String;
    type:String;
}
