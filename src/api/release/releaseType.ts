/*
 * @Author: Dhx
 * @Date: 2025-05-09 22:05:32
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\release\releaseType.ts
 */
type Release = {
    id:String;
    file:String;
    description:String;
    createTime:String;
}

type NewReleaseForm = {
    projectId:String;
    file:String;
    description:String;
}