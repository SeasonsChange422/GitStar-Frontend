<!--
 * @Author: Dhx
 * @Date: 2025-05-15 03:39:20
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\admin\feedback.vue
-->
<template>
    <div style="height: 100vh">
        <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
            <v-tab :value="value" v-for="(value, key) in E2C" :key="key" @click="clickType(key.toLowerCase())">{{ value }}</v-tab>
        </v-tabs>
        <v-data-table-virtual :headers="headers" :items="feedBackList">
            <template v-slot:item.objectId="{ item, index }">
                <div class="object" @click="clickObject(item.type,item.objectId)">
                    <p>{{ E2C[item.type.toLowerCase()] }}</p>
                    <p>{{ item.objectId }}</p>
                </div>
            </template>
            <template v-slot:item.feedback="{ item, index }">
                <p>{{ item.feedback }}</p>
            </template>
            <template v-slot:item.userId="{ item, index }">
                <div class="object" @click="clickObject('USER',item.userId)">
                    <p>{{ item.userId }}</p>
                </div>
            </template>
            <template v-slot:item.actions="{ item, index }">
                <v-btn size="small" color="primary" variant="text" @click="solveIndex = index; solveDialog = true">
                    标记为已处理
                </v-btn>
                <!-- <v-btn size="small" color="primary" variant="text" @click="edit(index)" v-if="editIndex != index">
                    编辑
                </v-btn>
                <v-btn size="small" color="primary" variant="text" v-if="editIndex == index" @click="save()">
                    保存
                </v-btn>
                <v-btn size="small" color="primary" variant="text" v-if="editIndex == index" @click="editIndex = -1">
                    取消
                </v-btn> -->
            </template>
        </v-data-table-virtual>
        <v-dialog v-model="solveDialog" max-width="300">
            <v-card>
                <v-card-title>处理反馈</v-card-title>
                <v-card-text>
                    确认将该反馈标记为已处理？
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="setReadedFunction()">确认</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="solveDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <adminUserComponent v-if="dialogType == 'USER'" v-model="userDialog" :userId="objectId"></adminUserComponent>
    <adminCommentComponent v-if="dialogType == 'COMMENT'"  v-model="commentDialog" :commentId="objectId"></adminCommentComponent>
    <adminPostComponent v-if="dialogType == 'POST'" v-model="postDialog" :postId="objectId"></adminPostComponent>
    <adminRepositoryComponent v-if="dialogType == 'REPOSITORY'" v-model="repositoryDialog" :repositoryId="objectId"></adminRepositoryComponent>
    <adminProjectComponent v-if="dialogType == 'PROJECT'" v-model="projectDialog" :projectId="objectId"></adminProjectComponent>
    <adminReleaseComponent v-if="dialogType == 'RELEASE'" v-model="releaseDialog" :releaseId="objectId"></adminReleaseComponent>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NewFeedbackForm, FeedBack } from '@/api/feedback/feedbackType'
import { newFeedback, getFeebackListByType, getFeedbackList,readFeedback } from '@/api/feedback/feedbackApi'
import router from '@/router'
const headers = [
    { title: "用户", key: "userId" },
    { title: "内容", key: "feedback" },
    { title: "(举报)对象", key: "objectId" },
    { title: "操作", key: "actions", sortable: false },
];
const E2C = ref({
    "all":"全部",
    "common": "反馈",
    "user": "用户",
    "project": "项目",
    "repository": "仓库",
    "post": "帖子",
    "comment": "评论",
    "release":"发行版"
})
onMounted(() => {
    getFeedbackListFunction()
})
const tab = ref('')
const feedBackList = ref<FeedBack[]>([]);

const setReadedFunction = () => {
    readFeedback(feedBackList.value[solveIndex.value].id).then((res:any)=>{
        if(res.code == 200 ){
            router.go(0)
        }
    })
}
const solveIndex = ref()
const solveDialog = ref(false)
const selectedType = ref<String>('')
const userDialog = ref<Boolean>(false)
const commentDialog = ref<Boolean>(false)
const postDialog = ref<Boolean>(false)
const repositoryDialog = ref<Boolean>(false)
const projectDialog = ref<Boolean>(false)
const releaseDialog = ref<Boolean>(false)
const dialogType = ref<String>('')
const objectId = ref<String>('')
const clickType = (type: String) => {
    if(type == 'all')getFeedbackListFunction()
    selectedType.value = type
    getFeebackListByTypeFunction()
}
const clickObject = (type:String,id:String) => {
    dialogType.value = type
    objectId.value = id
    switch(type) {
        case 'USER': {
            userDialog.value = true
            break;
        }
        case 'COMMENT': {
            commentDialog.value = true
            break;
        }
        case 'POST': {
            postDialog.value = true
            break;
        }
        case 'REPOSITORY': {
            repositoryDialog.value = true
            break;
        }
        case 'PROJECT': {
            projectDialog.value = true
            break;
        }
        case 'RELEASE': {
            releaseDialog.value = true
            break;
        }
    }
}
const getFeebackListByTypeFunction = () => {
    getFeebackListByType(selectedType.value).then((res: any) => {
        feedBackList.value = res.data
    })
}
const getFeedbackListFunction = () => {
    getFeedbackList().then((res: any) => {
        if (res.code == 200) {
            feedBackList.value = res.data
        }
    })
}
</script>
<style scoped>
.object{
    cursor: pointer;
}
</style>