<template>
    <v-data-table-server :headers="headers" :items="projectList" item-key="name" :items-length="total"
        :items-per-page="pageForm.size" :page="pageForm.current" @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange">
        <template v-slot:item.actions="{ item,index }">
            <commonBtn @click="clickDetails(index)">详情</commonBtn>
        </template>
    </v-data-table-server>
    <adminProjectComponent v-model="detailsDialog" v-if="detailsDialog" :projectId="projectList[currentIndex].id"></adminProjectComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Project } from '@/api/project/projectType'
import { getProjectList } from '@/api/admin/adminApi'
import { Page } from '@/api/common/pageType'

const projectList = ref<Project[]>([])
const total = ref(0)
const detailsDialog = ref(false)
const currentIndex = ref(0)
const headers = ref<any[]>([
    { title: 'ID', align: 'start', sortable: false, key: 'id' },
    { title: '仓库名', align: 'start', key: 'name' },
    { title: '操作',align: 'start',key: 'actions',sortable: false,width: '200px' }
])
const clickDetails = (index:number)=>{
    currentIndex.value = index
    detailsDialog.value = true
}
const pageForm = ref<Page>({
    current: 1,
    size: 10
})

onMounted(() => {
    getProjectListFunction()
})

const getProjectListFunction = () => {
    getProjectList(pageForm.value).then((res: any) => {
        if (res.code == 200) {
            projectList.value = res.data.records
            total.value = res.data.total
        }
    })
}

const handlePageChange = (newPage: number) => {
    pageForm.value.current = newPage
    getProjectListFunction()
}

const handleItemsPerPageChange = (newSize: number) => {
    pageForm.value.size = newSize
    pageForm.value.current = 1
    getProjectListFunction()
}
</script>

<style scoped></style>