<script setup>

import router from '@/router';
import { useFile, useUpload } from '@/stores/counter';

const trial = useUpload()
const fileCount = useFile()

function change() {
    trial.count2 = 1
    router.back()
}

function see(index) {
    router.push(
        {
            name: "detect",
            params: {
                id: fileCount.file[index].id,
                name: fileCount.file[index].name,
                index: index
            }
        }
    )
}

</script>

<template>
    <div class="all" v-if="fileCount.file.length != 0">
        <div class="back">
            <el-icon :size="30" class="icon" color="#7F7F7F" @click="change">
                <Back />
            </el-icon>
        </div>
        <div class="allFile" v-if="fileCount.file.length != 0">
            <div class="file" v-for="(ele, index) in fileCount.file">
                <img src="../static/WPS.png" alt="">
                <div class="fileName">{{ ele.name }}</div>
                <div class="probability" v-if="ele.probability != ''">{{ ele.probability }}</div>
                <div class="see" @click="see(index)" v-if="ele.probability != ''">查看报告</div>
                <div class="loading" v-if="ele.probability == ''">加载中</div>
            </div>
        </div>
    </div>
    <div class="noFile" v-if="fileCount.file.length == 0">
        <div class="temporary">暂无文件~</div>
    </div>
    <div>
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
.noFile {
    width: 100%;
    height: 45%;
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

.back {
    width: 90%;
    height: 5%;
    cursor: pointer;
}

.icon {
    float: left;
    width: 5%;
    height: 100%;
}

.all {
    width: 100%;
    height: 574px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.allFile {
    width: 90%;
    height: 60%;
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


.file {
    transform: translateX(60px);
    width: 90%;
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

.see {
    width: 120px;
    height: 40px;
    background-color: #7486F4;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    border-radius: 15px;
}

.loading {
    width: 120px;
    height: 40px;
    background-color: #7486F4;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
    border-radius: 15px;
}

.probability {
    cursor: default;
    color: #465EE6;
}
</style>