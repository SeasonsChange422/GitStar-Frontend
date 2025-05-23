<template>
<div>
    <input type="file" webkitdirectory @change="change">
</div>
</template>
<script lang="ts" setup>
import {uploadFile} from '@/api/file/fileApi'
const change =function(items) {
    for(let i=0;i<items.target.files.length;i++){
        let file = items.target.files[i];
        console.log(file)
        uploadFile(file).then((res:any)=>{
            if(res.code == 200){
                //
            }
        })
    }
}

</script>