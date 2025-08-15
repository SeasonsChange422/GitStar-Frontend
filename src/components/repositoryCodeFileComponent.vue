<!--
 * @Author: Dhx
 * @Date: 2025-04-09 16:22:46
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\components\repositoryCodeFileComponent.vue
-->
<template>
    <div class="code">
        <div class="code-head">
            <div class="code-head-left">
                {{ `${content.length} lines (${content.length} loc) · ${getBase64Size(fileBase64)} Bytes` }}
            </div>
            <div class="code-head-right">
                <div class="code-head-right-btn" @click="copy">
                    <svg aria-hidden="true" focusable="false" class="octicon octicon-copy" viewBox="0 0 16 16" width="16" height="16" fill="#59636E" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>
                </div>
                <div class="code-head-right-btn" @click="download">
                    <svg aria-hidden="true" focusable="false" class="octicon octicon-download" viewBox="0 0 16 16" width="16" height="16" fill="#59636E" display="inline-block" overflow="visible" style="vertical-align:text-bottom"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"></path><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"></path></svg>
                </div>
                
            </div>
        </div>
        <div class="code-content">
            <div class="code-line">
                <div class="code-line-item" v-for="(line,index) in content" :key="index">
                    {{ index + 1 }}
                </div>
            </div>
            <div class="code-text">
                <div class="code-text-item" v-for="(line,index) in content" :key="index">{{ line }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import {getRepositoryFile} from '@/api/repository/repositoryApi'
import {GetRepositoryFileForm} from '@/api/repository/repositoryType'
import {base64_to_utf8} from '@/utils/encode'
import router from '@/router'
onMounted(()=>{
    getRepositoryFileForm.value.repositoryId = router.currentRoute.value.query.id
    getRepositoryFileForm.value.path = router.currentRoute.value.query.path
    fileName.value = getRepositoryFileForm.value.path.substring(getRepositoryFileForm.value.path.lastIndexOf('/')+1)
    getRepositoryFile(getRepositoryFileForm.value).then((res:any)=>{
        if(res.code == 200) {
            fileBase64.value = res.data
            content.value = base64_to_utf8(res.data).replace('\r\n','\n').split('\n')

        }
    })
})
const content = ref<String[]>([])

const fileName = ref<String>('')
const getRepositoryFileForm = ref<GetRepositoryFileForm>({
    repositoryId: '',
    path: '',
})
const fileBase64 = ref<String>('')
const download = function(){
    downloadBase64File(
        fileBase64.value, 
        fileName.value, 
        'text/plain;charset=utf-8'
      );
}
const getBase64Size = function(base64:String){
    return Math.ceil(base64.length * 3 / 4) - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0)
}
const downloadBase64File = function(base64Data, fileName, mimeType){
  const base64Prefix = `data:${mimeType || 'application/octet-stream'};base64,`;
  const fullBase64 = base64Data.startsWith('data:') ? base64Data : base64Prefix + base64Data;
  const byteCharacters = base64_to_utf8(fullBase64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType || 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
    window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
const copy = function() {
    navigator.clipboard.writeText(base64_to_utf8(fileBase64.value))
}

</script>
<style scoped>
.code{
    width: 100%;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    overflow: hidden;
}
.code-head{
    height: 46px;
    padding: 8px 16px;
    background-color: #F6F8FA;
    border-bottom: #D1D9E0 1px solid;
    border-radius: 6px 6px 0 0;
    display: flex;
    justify-content: space-between;
}
.code-head-left{
    height: 28px;
    font-size: 12px;
    line-height: 28px;
    font-family: monospace;
    color: #59636e;
}
.code-head-right{
   height: 28px; 
   display: flex;
}
.code-head-right-btn{
    height: 28px;
    padding: 0 8px;
    border: #D1D9E0 1px solid;
    border-radius: 6px;
    margin-right: 8px;
}
.code-head-right-btn:hover{
    cursor: pointer;
    background-color: #EFF2F5;
}

.code-content{
    width: 100%;
    display: flex;
    padding: 12px 0;
    overflow-x: scroll;
}
.code-line{
    width: 50px;
    background-color: white;
}
.code-line-item{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding:0 10px;
}
.code-text{
    margin-left: 20px;  
}
.code-text-item{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 12px;
    height:32px;
    white-space: pre;
    line-height: 32px;
}
</style>