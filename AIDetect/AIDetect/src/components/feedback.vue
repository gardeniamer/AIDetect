<script setup>
import { ref, watchEffect } from 'vue';


const value = ref()
const content = ref("")
const options = [{
    value: 1,
    label: '显示反馈'
},
{
    value: 2,
    label: '功能反馈'
},
{
    value: 3,
    label: '检测效果反馈'
},
{
    value: 4,
    label: '其它'
}]

const fileList = ref([

])



const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

let count = fileList.value.length
watchEffect(() => {
    if (fileList.value.length > count) {
        ElMessage.success('上传成功~')
        count = fileList.value.length
        console.log(fileList.value);
    }
})

function finish() {
    if (value.value == '' || content.value == '' || count == 0) {
        ElMessage.warning('请完善信息')
    }
    else {
        value.value = ''
        content.value = ''
        fileList.value = []
        ElMessage.success('反馈成功~')
    }
}

</script>

<template>
    <div class="all">
        <div class="word">
            反馈收集
        </div>
        <div class="type">
            <li>
                <span style="color: #000;"> 反馈类别：</span>
            </li>
            <el-select-v2 v-model="value" :options="options" placeholder="请选择类别"
                style="width: 500px; margin-left: 10px; " />
        </div>
        <div class="content">
            <li>
                <span style="color: #000;"> 反馈内容：</span>
            </li>
            <textarea cols="30" rows="5" class="area2" v-model = "content"></textarea>
        </div>
        <div class="photo">
            <li>
                <span style="color: #000;"> 上传照片：</span>
            </li>
            <div class="add">
                <el-upload v-model:file-list="fileList" action="#" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :auto-upload="false">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </div>
        </div>
        <div class="push">
            <div class="finish" @click="finish">
                完成
            </div>
        </div>
    </div>

</template>

<style scoped>
.all {
    width: 100%;
    height: 574px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.word {
    width: 80%;
    height: 10%;
    line-height: 57px;
    font-weight: bold;
    font-size: 20px;
}

.type {
    width: 80%;
    height: 20%;
    display: flex;
    flex-direction: row;
}

.photo {
    width: 80%;
    height: 30%;
    display: flex;
    flex-direction: row;
}

.content {
    width: 80%;
    height: 40%;
    display: flex;
    flex-direction: row;
}

li {
    list-style-type: square;
    color: #A76A5D;
}

.area2 {
    margin-left: 10px;
    width: 70%;
    height: 80%;
    border: 1px solid #92919F;
    border-radius: 10px;
    font-size: 16px;
    resize: none;
    padding: 10px;  
}

.area2:-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.area2::-webkit-scrollbar-track {
    background: #CBC9DF;
    border-radius: 10px;
}

.area2::-webkit-scrollbar-thumb {
    background: #5964DB;
    border-radius: 10px;
}

.add {
    margin-left: 10px;
}

.push {
    width: 100%;
    height: 10%;
}

.finish {
    margin: auto;
    width: 120px;
    height: 80%;
    text-align: center;
    line-height: 41px;
    color: white;
    background-color: #5D78EE;
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}
</style>