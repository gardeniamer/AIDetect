<script setup>
import { ref } from 'vue';
import { useUpload, useFile } from '@/stores/counter';
import router from '@/router';
import axios from "axios"

const trial = useUpload()
const file = useFile()

const content = ref("")

let count = 1
while (1) {
    if (file.arr.indexOf(count) != -1) {
        count++
    }
    else {
        break
    }
}

function finish() {
    if (content.value == '') {
        ElMessage.error('请输入内容后再上传~')
    }
    else {
        let counts = file.file.length
        file.file.push({
            id: (file.file.length - 1) >= 0 ? file.file[file.file.length - 1].id + 1 : 1,
            name: `新建文件(${count}).txt`,
            probability: ""
        })
        ElMessage.success('上传成功~')
        change()
        axios({
            method: "post",
            url: "/api/postdata",
            data: {
                datacount: 1,
                data: [{
                    id: (file.file.length - 1) >= 0 ? file.file[file.file.length - 1].id + 1 : 1,
                    content: content.value,
                    language: 'chinese'
                }]
            }
        }).then((data) => {
            file.file[counts] = {
                id: data.data.data.data[0].id,
                name: `新建文件(${count}).txt`,
                probability: `${String(data.data.data.data[0].sumprobability).split(".")[1].slice(0, 2)}%`,
                parts: data.data.data.data[0].parts,
                partsLength: data.data.data.data[0].parts.length,
                length: content.value.length
            }
            content.value = ''
            file.arr.push(count)
        }).catch((err) => {
            file.file.splice(counts, 1)
            ElMessage.error('上传失败,请联系管理员！')
        })

    }
}

function change() {
    trial.showArea = 0
    router.back()
}

</script>

<template>

    <div class="all">
        <div class="back">
            <el-icon :size="30" class="icon" color="#7F7F7F" @click="change">
                <Back />
            </el-icon>
        </div>

        <div class="word">
            文本输入
        </div>
        <div class="content">
            <li>
                <span style="color: #000;"> 内容：</span>
            </li>
            <textarea cols="30" rows="5" class="area" v-model="content"></textarea>
        </div>
        <div class="push">
            <div class="finish" @click="finish">
                上传
            </div>
        </div>
    </div>

</template>

<style scoped>
.icon {
    float: left;
    width: 5%;
    height: 100%;
}

.all {
    padding: 10px;
    width: 100%;
    height: 574px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 0px 10px 6px #A8BDE6;
    transform: translateY(40px);
}

.back {
    width: 90%;
    height: 5%;
}

.word {
    width: 80%;
    height: 10%;
    line-height: 57px;
    font-weight: bold;
    font-size: 20px;
}

.content {
    width: 80%;
    height: 75%;
    display: flex;
    flex-direction: row;
}

li {
    list-style-type: square;
    color: #A76A5D;
}

.area {
    width: 80%;
    height: 90%;
    border: 2px solid #92919F;
    border-radius: 10px;
    font-size: 20px;
    resize: none;
    padding: 10px;
}

.area::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.area::-webkit-scrollbar-track {
    background: #CBC9DF;
    border-radius: 10px;
}

.area::-webkit-scrollbar-thumb {
    background: #5964DB;
    border-radius: 10px;
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
    line-height: 46px;
    color: white;
    background-color: #5D78EE;
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}
</style>