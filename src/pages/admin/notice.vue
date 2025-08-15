<template>
  <div style="height: 100vh">
    <v-btn @click="newDialog = true">新增公告</v-btn>
    <v-data-table-virtual :headers="headers" :items="noticeList">
      <template v-slot:item.text="{ item, index }">
        <p>{{ item.text }}</p>
      </template>
      <template v-slot:item.img="{ item, index }">
        <img :src="item.img" style="width:48px;height:48px" />
      </template>
      <template v-slot:item.actions="{ item, index }">
        <v-btn size="small" color="primary" variant="text" @click="deleteIndex = index; deleteDialog = true">
          删除
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
    <v-dialog v-model="deleteDialog" max-width="300">
      <v-card>
        <v-card-title>删除公告</v-card-title>
        <v-card-text>
          确认删除公告？
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteFunction()">确认</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="newDialog" max-width="500">
      <v-card>
        <v-card-title>新增公告</v-card-title>
        <v-card-text>
          <v-text-field label="公告内容" variant="outlined" v-model="newNoitceForm.text"></v-text-field>
          <v-file-input v-model="file" label="File input" placeholder="上传图片" prepend-icon="mdi-paperclip"
            @change="uploadFunction">
            <template v-slot:selection="{ fileNames }">
              <template v-for="fileName in fileNames" :key="fileName">
                <v-chip class="me-2" color="primary" size="small" label>
                  {{ fileName }}
                </v-chip>
              </template>
            </template>
          </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="newNoticeFunction()">确认</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="newDialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Notice,NewNoticeForm } from "@/api/notice/noticeType";
import { delNotice, getNoticeList, newNotice } from "@/api/notice/noticeApi";
import { uploadPicture } from "@/api/file/fileApi";
import { successAlert } from "@/utils/message";
import router from '@/router'
const headers = [
  { title: "图片", key: "img" },
  { title: "文字", key: "text" },
  { title: "操作", key: "actions", sortable: false },
];
const file = ref<File>();
// const updateText = ref("");
// const updateImg = ref("");
const newDialog = ref(false);
const noticeList = ref<Notice[]>([]);
const newNoitceForm = ref<NewNoticeForm>({});
const deleteIndex = ref()
const deleteDialog = ref(false)
const newNoticeFunction = () => {
  newNotice(newNoitceForm.value).then((res: any) => {
    if (res.code == 200) {
      successAlert("新增成功");
      setTimeout(() => {
        router.go(0)
      }, 1000)
    }
  });
};
const uploadFunction = () => {
  uploadPicture(file.value).then((res: any) => {
    newNoitceForm.value.img = res.data.url;
  });
};
const deleteFunction = () => {
  delNotice(noticeList.value[deleteIndex.value]).then((res: any) => {
    if (res.code == 200) {
      successAlert("删除成功");
      setTimeout(() => {
        router.go(0)
      }, 1000)
    }
  });
};
// const editIndex = ref(-1)
// const edit = function(index) {
//     editIndex.value = index
//     updateText.value = noticeList.value[index].text
//     console.log(noticeList.value[index])
// }
// const save = function () {
//     noticeList.value[editIndex.value].text = updateText.value
//     updateRecommend(noticeList.value[editIndex.value]).then((res)=>{
//         if(res.code == 200) {
//             editIndex.value = -1

//         }
//     })
// }
onMounted(() => {
  getNoticeListFunction();
});
const getNoticeListFunction = () => {
  getNoticeList().then((res) => {
    if (res.code == 200) {
      noticeList.value = res.data;
    }
  });
};
</script>
