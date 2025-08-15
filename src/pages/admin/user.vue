<!--
 * @Author: Dhx
 * @Date: 2025-05-16 21:42:19
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\pages\admin\user.vue
-->
<template>
    <v-data-table-server :headers="headers" :items="userList" item-key="name" :items-length="total"
        :items-per-page="pageForm.size" :page="pageForm.current + 1" @update:page="handlePageChange"
        @update:items-per-page="handleItemsPerPageChange">
        <template v-slot:item.actions="{ item,index }">
            <commonBtn @click="clickDetails(index)">详情</commonBtn>
        </template>
    </v-data-table-server>
    <adminUserComponent v-model="detailsDialog" v-if="detailsDialog" :userId="userList[currentIndex].id"></adminUserComponent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User } from '@/api/user/userType'
import { getUserList } from '@/api/admin/adminApi'
import { Page } from '@/api/common/pageType'

const userList = ref<User[]>([])
const total = ref(0)
const detailsDialog = ref(false)
const currentIndex = ref(0)
const headers = ref<any[]>([
    { title: 'ID', align: 'start', sortable: false, key: 'id' },
    { title: '昵称', align: 'start', key: 'nickname' },
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
    getUserListFunction()
})

const getUserListFunction = () => {
    getUserList(pageForm.value).then((res: any) => {
        if (res.code == 200) {
            userList.value = res.data.records
            total.value = res.data.total
        }
    })
}

const handlePageChange = (newPage: number) => {
    pageForm.value.current = newPage - 1
    getUserListFunction()
}

const handleItemsPerPageChange = (newSize: number) => {
    pageForm.value.size = newSize
    pageForm.value.current = 0
    getUserListFunction()
}
</script>

<style scoped></style>