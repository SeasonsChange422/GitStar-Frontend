/*
 * @Author: Dhx
 * @Date: 2025-02-26 15:47:20
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\project\projectType.ts
 */
type Project = {
    id: String;
    name:String;
    visibility:boolean;
    logo:String;
    description:String;
    createTime:String;
}

type NewProjectForm = {
    name:String;
    visibility:boolean;
    logo:String;
    description:String;
}

type UpdateProjectForm = {
    id:String;
    name:String;
    visibility:Boolean;
    logo:String;
    description:String;
}