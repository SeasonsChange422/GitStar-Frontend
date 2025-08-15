<template>
    <div class="tag-editor">
        <!-- 已选标签展示区域 -->
        <div class="selected-tags">
            <h3>已选择标签</h3>
            <div class="tag-list">
                <tagComponent v-for="tag in selectedTags" :key="tag.id" :tag="tag" class="selected"
                    @click="handleTagClick(tag)" />
            </div>
        </div>

        <br>
        <div class="all-tags">
            <h3>可选标签</h3>
            <div class="tag-list" v-if="allTags.length!=0">
                <tagComponent v-for="tag in availableTags" :key="tag.id" :tag="tag" @click="handleTagClick(tag)" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Project } from '@/api/project/projectType'
import { ref, computed } from 'vue'
import type { Tag,ProjectTagForm } from '@/api/tag/tagType'
import { getTags,addTagToProject,removeTagFromProject,getTagOfProject } from "@/api/tag/tagApi";
import { onMounted } from 'vue';

const props = defineProps({
    project: {} as Project,
})
const allTags = ref<Tag[]>([])
const selectedTags = ref<Tag[]>([])
const projectTagForm = ref<ProjectTagForm>({})
const availableTags = computed(() => {
    return allTags.value.filter((tag) => {return !selectedTags.value.some((selected) => {return selected.id === tag.id })})
})

const handleTagClick = (tag: Tag) => {
    const index = selectedTags.value.findIndex(t => {return t.id === tag.id})
    console.log(index)
    projectTagForm.value.tagId = tag.id
    if (index === -1) {
        selectedTags.value.push(tag)
        addTagToProjectFunction()
    } else {
        selectedTags.value.splice(index, 1)
        removeTagFromProjectFunction()
    }
}
onMounted(()=>{
    getTagsFunction()
    projectTagForm.value.projectId = props.project.id
    getTagOfProjectFunction()
})
const getTagsFunction = () =>{
    getTags().then((res:any)=>{
        if(res.code == 200) {
            allTags.value = res.data
        }
    })
}
const getTagOfProjectFunction = () =>{
    getTagOfProject(props.project.id).then((res:any)=>{
        if(res.code == 200) {
            selectedTags.value = res.data
        }
    })
}

const addTagToProjectFunction = () =>{
    addTagToProject(projectTagForm.value).then((res:any)=>{

    })
}
const removeTagFromProjectFunction = () =>{
    removeTagFromProject(projectTagForm.value).then((res:any)=>{

    })
}
</script>
<style scoped>
.tag-editor {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #666;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.selected {
    background-color: #e3f2fd;
    border-color: #2196f3 !important;
}

.selected:hover {
    background-color: #bbdefb;
}
</style>