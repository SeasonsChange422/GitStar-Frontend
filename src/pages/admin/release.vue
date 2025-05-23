<!--
 * @Author: Dhx
 * @Date: 2025-05-16 22:02:29
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\admin\release.vue
-->
<template>
    <v-data-table-server :headers="headers" :items="releaseList" item-key="name" :items-length="total"
        :items-per-page="pageForm.size" :page="pageForm.current + 1" @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange">
        <template v-slot:item.actions="{ item,index }">
            <commonBtn @click="clickDetails(index)">详情</commonBtn>
        </template>
    </v-data-table-server>
    <adminReleaseComponent v-model="detailsDialog" v-if="detailsDialog" :releaseId="releaseList[currentIndex].id"></adminReleaseComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Release } from '@/api/release/releaseType'
import { getReleaseList } from '@/api/admin/adminApi'
import { Page } from '@/api/common/pageType'

const releaseList = ref<Release[]>([])
const total = ref(0)
const detailsDialog = ref(false)
const currentIndex = ref(0)
const headers = ref<any[]>([
    { title: 'ID', align: 'start', sortable: false, key: 'id' },
    { title: '文件', align: 'start', key: 'file' },
    { title: '操作',align: 'start',key: 'actions',sortable: false,width: '200px' }
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
    getReleaseListFunction()
})

const getReleaseListFunction = () => {
    getReleaseList(pageForm.value).then((res: any) => {
        if (res.code == 200) {
            releaseList.value = res.data.records
            total.value = res.data.total
        }
    })
}

const handlePageChange = (newPage: number) => {
    pageForm.value.current = newPage - 1
    getReleaseListFunction()
}

const handleItemsPerPageChange = (newSize: number) => {
    pageForm.value.size = newSize
    pageForm.value.current = 0
    getReleaseListFunction()
}
</script>

<style scoped></style>