<template>
    <div style="height: 100vh">
      <v-btn @click="newDialog = true">新增标签</v-btn>
      <v-data-table-virtual :headers="headers" :items="tagList">
        <template v-slot:item.id="{ item, index }">
          <p>{{ item.id }}</p>
        </template>
        <template v-slot:item.name="{ item, index }">
          <p>{{ item.name }}</p>
        </template>
        <template v-slot:item.actions="{ item, index }">
          <v-btn size="small" color="red" variant="text" @click="deleteIndex = index;deleteDialog = true">
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
          <v-card-title>删除标签</v-card-title>
          <v-card-text>
            确认删除标签？
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
          <v-card-title>新增标签</v-card-title>
          <v-card-text>
            <v-text-field
              label="标签名称"
              variant="outlined"
              v-model="newTagForm.name"
            ></v-text-field>
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
  import { Tag,NewTagForm,DelTagForm } from "@/api/tag/tagType";
  import { delTag, getTags, newTag } from "@/api/tag/tagApi";
  import { successAlert } from "@/utils/message";
  import router from '@/router'
  const headers = [
    { title: "id", key: "id" },
    { title: "名称", key: "name" },
    { title: "操作", key: "actions", sortable: false },
  ];
  const newDialog = ref(false);
  const tagList = ref<Tag[]>([]);
  const newTagForm = ref<NewTagForm>({});
  const delTagForm = ref<DelTagForm>({})
  const deleteIndex = ref()
  const deleteDialog = ref(false)
  const newNoticeFunction = () => {
    newTag(newTagForm.value).then((res: any) => {
      if (res.code == 200) {
        successAlert("新增成功");
        setTimeout(()=>{
          router.go(0)
        },100)
      }
    });
  };
  const deleteFunction = () => {
    delTagForm.value.id = tagList.value[deleteIndex.value].id
    delTag(delTagForm.value).then((res: any) => {
      if (res.code == 200) {
        successAlert("删除成功");
        setTimeout(()=>{
          router.go(0)
        },100)
      }
    });
  };
  onMounted(() => {
    getTagListFunction();
  });
  const getTagListFunction = () => {
    getTags().then((res) => {
      if (res.code == 200) {
        tagList.value = res.data;
      }
    });
  };
  </script>
  