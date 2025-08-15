/*
 * @Author: Dhx
 * @Date: 2025-02-27 14:39:17
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\post\postType.ts
 */
type NewPostForm = {
    title:String;
    context:String;
    img:String;
}
type DelPostForm = {
    id: String;
}

type Post = {
    id:String;
    title:String;
    context:String;
    img:String;
    createTime:String;
}