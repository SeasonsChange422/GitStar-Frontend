<template>
    <v-data-table-server :headers="headers" :items="repositoryList" item-key="name" :items-length="total"
        :items-per-page="pageForm.size" :page="pageForm.current + 1" @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange">
        <template v-slot:item.actions="{ item,index }">
            <commonBtn @click="clickDetails(index)">详情</commonBtn>
        </template>
    </v-data-table-server>
    <adminRepositoryComponent v-model="detailsDialog" v-if="detailsDialog" :repositoryId="repositoryList[currentIndex].id"></adminRepositoryComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Repository } from '@/api/repository/repositoryType'
import { getRepositoryList } from '@/api/admin/adminApi'
import { Page } from '@/api/common/pageType'

const repositoryList = ref<Repository[]>([])
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
    current: 0,
    size: 10
})

onMounted(() => {
    getRepositoryListFunction()
})

const getRepositoryListFunction = () => {
    getRepositoryList(pageForm.value).then((res: any) => {
        if (res.code == 200) {
            repositoryList.value = res.data.records
            total.value = res.data.total
        }
    })
}

const handlePageChange = (newPage: number) => {
    pageForm.value.current = newPage - 1
    getRepositoryListFunction()
}

const handleItemsPerPageChange = (newSize: number) => {
    pageForm.value.size = newSize
    pageForm.value.current = 0
    getRepositoryListFunction()
}
</script>

<style scoped></style>