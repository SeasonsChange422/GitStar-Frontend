<!--
 * @Author: Dhx
 * @Date: 2025-05-16 22:01:17
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\admin\post.vue
-->
<template>
    <v-data-table-server :headers="headers" :items="postList" item-key="name" :items-length="total"
        :items-per-page="pageForm.size" :page="pageForm.current + 1" @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange">
        <template v-slot:item.actions="{ item,index }">
            <commonBtn @click="clickDetails(index)">详情</commonBtn>
        </template>
    </v-data-table-server>
    <adminPostComponent v-model="detailsDialog" v-if="detailsDialog" :postId="postList[currentIndex].id"></adminPostComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Post } from '@/api/post/postType'
import {delPost} from '@/api/post/delPost'
import { getPostList } from '@/api/admin/adminApi'
import { Page } from '@/api/common/pageType'

const postList = ref<Post[]>([])
const total = ref(0)
const detailsDialog = ref(false)
const currentIndex = ref(0)
const headers = ref<any[]>([
    { title: 'ID', align: 'start', sortable: false, key: 'id' },
    { title: '标题', align: 'start', key: 'title' },
    { title: '操作',align: 'end',key: 'actions',sortable: false,width: '200px' }
])
const clickDetails = (index:number)=>{
    currentIndex.value = index
    detailsDialog.value = true
}
const pageForm = ref<Page>({
    current: 0,
    size: 10
})

onMounted(() => {
    getPostListFunction()
})

const getPostListFunction = () => {
    getPostList(pageForm.value).then((res: any) => {
        if (res.code == 200) {
            postList.value = res.data.records
            total.value = res.data.total
        }
    })
}

const handlePageChange = (newPage: number) => {
    pageForm.value.current = newPage - 1
    getPostListFunction()
}

const handleItemsPerPageChange = (newSize: number) => {
    pageForm.value.size = newSize
    pageForm.value.current = 0
    getPostListFunction()
}

</script>

<style scoped></style>