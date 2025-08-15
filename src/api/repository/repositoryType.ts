/*
 * @Author: Dhx
 * @Date: 2025-02-26 23:18:41
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\api\repository\repositoryType.ts
 */
type Repository = {
    id:String;
    name:String;
    createTime:String;
    description:String;
    download:Number;
    star:Number;
    view:Number;
    starred:Boolean;
}
type NewRepository = {
    projectId:String;
    name:String;
    description:String;
}

type UpdateRepositoryForm = {
    repositoryId:String;
    name:String;
    description:String;
}

type GetRepositoryFolderForm = {
    repositoryId:String;
    path:String;
}
type GetRepositoryFilerForm = {
    repositoryId:String;
    path:String;
}

type RepositoryFile = {
    path:String;
    folder:boolean;
}

type UploadFileForm = {
    file:File;
    repositoryId:String;
}