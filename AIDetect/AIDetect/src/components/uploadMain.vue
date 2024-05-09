<script setup>
import router from '@/router';
import { useFile, useUpload } from '@/stores/counter';
const trial = useUpload()
const fileCount = useFile()
import { ref, watchEffect } from 'vue';
import pushWord from './pushWord.vue';
import mammoth from "mammoth";
import axios from "axios"



function change() {
    router.push('/uploadMain/upload')
    trial.changeWay = 1
}

const fileList = ref([

])

let count = fileList.value.length
let file = ""
watchEffect(() => {
    if (fileList.value.length > count) {
        if (fileList.value.length - count == 1) {
            count = fileList.value.length
            file = fileList.value[fileList.value.length - 1].raw
            if (file.name.split(".")[1] == 'txt') {
                readTxt(file)
            }
            else {
                readDocx(file)
            }
        }
        if (fileList.value.length - count > 1) {
            console.log(fileList.value);
            for (let i of fileList.value) {
                if (i.raw.name.split(".")[1] == 'txt') {
                    readTxt(i.raw)
                }
                else {
                    readDocx(i.raw)
                }
            }
        }



        // console.log(fileList.value[fileList.value.length - 1].raw);
        // if (file.name.split(".")[1] == 'txt') {
        //     readTxt(file)
        // }
        // else {
        //     readDocx(file)
        // }

    }
})

function readTxt(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
        console.log(reader.result);
        let refresh = 0
        for (let i of fileCount.file) {
            if (i.name == file.name) {
                refresh = 1
                ElMessage.error('请勿上传相同的文件！')
            }
        }
        if (refresh == 0) {
            let count = fileCount.file.length
            fileCount.file.push({
                id: (fileCount.file.length - 1) >= 0 ? fileCount.file[fileCount.file.length - 1].id + 1 : 1,
                name: file.name,
                probability: ""
            })
            ElMessage.success('上传成功~')
            axios({
                method: "post",
                url: "/api/postdata",
                data: {
                    datacount: 1,
                    data: [{
                        id: (fileCount.file.length - 1) >= 0 ? fileCount.file[fileCount.file.length - 1].id + 1 : 1,
                        content: reader.result,
                        language: 'chinese'
                    }]
                }
            }).then((data) => {
                fileCount.file[count] = {
                    id: fileCount.file[count].id,
                    name: fileCount.file[count].name,
                    probability: `${String(data.data.data.data[0].sumprobability).split(".")[1].slice(0, 2)}%`,
                    parts: data.data.data.data[0].parts,
                    partsLength: data.data.data.data[0].parts.length,
                    length: reader.result.length
                }
            }).catch((err) => {
                fileCount.file.splice(count, 1)
                ElMessage.error('上传失败,请联系管理员！')
            })
        }

    }
}


function readDocx(file) {
    const reader = new FileReader()
    // reader.readAsText(file, 'utf-8')
    reader.readAsArrayBuffer(file)
    // reader.readAsDataURL(file)
    reader.onload = () => {
        console.log(reader.result);
        let refresh = 0
        for (let i of fileCount.file) {
            if (i.name == file.name) {
                refresh = 1
                ElMessage.error('请勿上传相同的文件！')
            }
        }
        if (refresh == 0) {
            let count = fileCount.file.length
            fileCount.file.push({
                id: (fileCount.file.length - 1) >= 0 ? fileCount.file[fileCount.file.length - 1].id + 1 : 1,
                name: file.name,
                probability: ""
            })
            ElMessage.success('上传成功~')
            mammoth.extractRawText({ arrayBuffer: reader.result })
                .then(function (result) {
                    console.log(result.value);
                    axios({
                        method: "post",
                        url: "/api/postdata",
                        data: {
                            datacount: 1,
                            data: [{
                                id: (fileCount.file.length - 1) >= 0 ? fileCount.file[fileCount.file.length - 1].id + 1 : 1,
                                content: result.value,
                                language: 'chinese'
                            }]
                        }
                    }).then((data) => {
                        fileCount.file[count] = {
                            id: fileCount.file[count].id,
                            name: fileCount.file[count].name,
                            probability: `${String(data.data.data.data[0].sumprobability).split(".")[1].slice(0, 2)}%`,
                            parts: data.data.data.data[0].parts,
                            partsLength: data.data.data.data[0].parts.length,
                            length: result.value.length
                        }
                    })
                })
                .catch(function (err) {
                    fileCount.file.splice(count, 1)
                    ElMessage.error('上传失败,请联系管理员！')
                });
        }
    }
}


function remove(index) {
    ElMessageBox.confirm(
        '该文件将被删除，是否继续',
        '警告',
        {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            let re = /^新建文件/
            if (re.test(fileCount.file[index].name)) {
                fileCount.arr.splice(fileCount.arr.indexOf(Number(fileCount.file[index].name.split("(")[1].split(")")[0])), 1)
            }
            fileCount.file.splice(index, 1)
        })
}

function selectFile() {

}


const uploadRef = ref()

function success(res, file) {
    setTimeout(() => {
        console.log(res);
        router.push("/uploadMain")
        fileCount.file.push({
            id: Number(fileCount.file[fileCount.file.length - 1].id) + 1,
            name: file.name
        })
        ElMessage.success('上传成功')
        trial.count = 0
        // trial.changeWay = 0
    }, 500);
}

function error() {
    setTimeout(() => {
        router.push("/uploadMain")
        ElMessage.error('上传失败，请联系管理员处理')
    }, 500);

}

function ing() {
    router.push("/loading")
}

function showTextarea() {
    trial.showArea = 1
    router.push("/uploadMain/pushWord")
}

function detect() {
    if (fileCount.file.length == 0) {
        ElMessage.warning("请先上传文件~")
    }
    else {
        trial.count2 = 2
        router.push("/detectMsg")
    }

}

</script>

<template>
    <div class="all" v-show="trial.showArea == 0">
        <div class="word">
            文件上传
        </div>
        <div class="upload">
            <el-upload ref="uploadRef" class="inner" v-model:file-list="fileList" action="#" :auto-upload="false"
                :show-file-list="false" :on-success="success" :on-error="error" :on-progress="ing" multiple>
                <template #trigger>
                    <div class="trial">
                        <img src="../static/文件上传.png" alt="" class="pic">
                        <span class="innerWord trial">点击此处，上传文件</span>
                    </div>
                </template>
            </el-upload>

            <div @click="showTextarea" class="inner">
                <img src="../static/文本输入.png" alt="" class="pic2">
                <span class="innerWord">点击此处，输入文本</span>
            </div>

        </div>
        <div class="noFile" v-if="fileCount.file.length == 0">
            <div class="temporary">暂无文件~</div>
        </div>
        <div class="allFile" v-if="fileCount.file.length != 0">
            <div class="file" v-for="(ele, index) of fileCount.file">
                <img src="../static/WPS.png" alt="">
                <div class="fileName">{{ ele.name }}</div>
                <div class="remove" @click="remove(index)" v-if="ele.probability != ''">删除</div>
                <div class="loading" v-if="ele.probability == ''">上传中</div>
            </div>

        </div>
        <div class="detect">
            <div class="next" @click="detect">已上传，下一步</div>
        </div>
    </div>

    <div v-show="trial.showArea == 1">
        <RouterView></RouterView>
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
    position: relative;
}

.word {
    width: 80%;
    height: 10%;
    line-height: 57px;
    font-weight: bold;
    font-size: 20px;
}

.upload {
    width: 90%;
    height: 40%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.inner {
    width: 45%;
    height: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 40px;
    cursor: pointer;
    background-color: #5F77F5;
    box-shadow: 0px 4px 2px 4px #A8BDE6;
}

.trial {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.pic {
    padding: 12px;
    background-color: #fff;
    border-radius: 10px;
}

.pic2 {
    width: 82px;
    height: 67px;
}

.innerWord {
    padding: 20px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.noFile {
    width: 90%;
    height: 45%;
}

.allFile {
    width: 90%;
    height: 45%;
    overflow-y: scroll;
}

.allFile::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.allFile::-webkit-scrollbar-track {
    background: #CBC9DF;
    border-radius: 10px;
}

.allFile::-webkit-scrollbar-thumb {
    background: #5964DB;
    border-radius: 10px;
}

.temporary {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #4657B9;
    font-size: 24px;
    font-weight: bold;
    line-height: 258px;
}

.file {
    transform: translateX(110px);
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 0 20px 0;
    margin: 20px 0 20px 0;
    border-bottom: 1px dashed #465EE6;
}

.fileName {
    width: 350px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.probability,
.see,
.remove {
    color: #465EE6;
    cursor: pointer;
}

.loading {
    color: #465EE6;
}

.probability {
    cursor: default;
}

.detect {
    width: 100%;
    height: 10%;
}

.next {
    margin: auto;
    width: 240px;
    height: 80%;
    text-align: center;
    line-height: 46px;
    color: white;
    background-color: #5D78EE;
    border-radius: 20px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}
</style>