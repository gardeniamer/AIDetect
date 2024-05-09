<script setup>

import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFile } from '@/stores/counter';

const fileCount = useFile()
const route = useRoute()
const name = ref(route.params.name.split('.')[0])

const id = ref(route.params.id)

let index = route.params.index

const arr = ref([])

fileCount.file.forEach((ele, index) => {
    if (ele.id == id.value) {
        arr.value = fileCount.file[index].parts
        console.log(arr.value);
    }
})

function pre() {
    if (Number(index) - 1 < 0) {
        index = fileCount.file.length
    }
    index = Number(index) - 1
    router.push("/loading")
    setTimeout(() => {
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
    }, 1000);
}

function next() {
    if (Number(index) + 1 > fileCount.file.length - 1) {
        index = -1
    }
    index = Number(index) + 1
    router.push("/loading")
    setTimeout(() => {
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
    }, 1000);
}

function downloadFile(url, name) {
    url = url || ''
    name = name || ''
    let ele = document.createElement('a')
    ele.target = '_blank'
    ele.href = url
    ele.download = name
    ele.click()
    ele = null
}

const probability = fileCount.file[index].probability.split('%')[0]

</script>

<template>
    <div class="all">
        <div class="left">
            <div class="title">
                {{ name }}
            </div>
            <div class="content">
                <div :class="[ 'trial',
                    { 'black': Number(String(ele.probability).split('.')[1].slice(0, 2)) < 50 }, {
                        'orange':
                            Number(String(ele.probability).split('.')[1].slice(0, 2)) < 80 &&
                            Number(String(ele.probability).split('.')[1].slice(0, 2)) >= 50
                    },
                    { 'red': Number(String(ele.probability).split('.')[1].slice(0, 2)) >= 80 },
                ]" v-for="(ele, index) in arr">
                    {{ ele.content }}
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title">
                疑似概率
            </div>
            <div class="introduce">
                <div class="rate">
                    {{ probability }}%
                </div>
                <div class="wordIntro">
                    <div class="innerIntro">
                        文件名称：{{ name }}
                    </div>
                    <div class="innerIntro">
                        字数: {{ fileCount.file[index].length }}
                    </div>
                    <div class="innerIntro">
                        段落数：{{ fileCount.file[index].partsLength }}
                    </div>
                </div>
            </div>
            <div class="illustrate">
                <li>
                    <span style="color: #000;">
                        黑色：
                    </span>
                    <span>
                        低度疑似AI生成,AI生成概率在0%~50%,判定为人类创作
                    </span>
                </li>
                <li style="color: #E3925D;">
                    <span style="color: #000;">
                        橙色：
                    </span>
                    <span>
                        中度疑似AI生成,AI生成概率在50%~80%,判定为AI生成
                    </span>
                </li>
                <li style="color: #D74117;">
                    <span style=" color: #000;">
                        红色：
                    </span>
                    <span>
                        高度疑似AI生成,AI生成概率在80%~100%,判定为AI创作
                    </span>
                </li>
            </div>
            <div class="more">
                <div class="top">
                    <div class="pre" @click="pre">上一个</div>
                    <div class="next" @click="next">下一个</div>
                </div>
                <div class="bottom">
                    <div class="downloadFile"
                        @click="downloadFile('http://47.100.201.199:9006/files/demo.xlsx', '测试.excel')">
                        导出文件报告
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.all {
    width: 100%;
    height: 650px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.trial {
    margin: 0 0 10px 0;
}

.left {
    width: 50%;
    height: 100%;
}

.right {
    width: 35%;
    height: 100%;
}

.title {
    width: 100%;
    height: 10%;
    line-height: 57px;
    font-weight: bold;
    font-size: 20px;
}

.content {
    width: 100%;
    height: 90%;
    overflow-y: scroll;
}

.content::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.content::-webkit-scrollbar-track {
    background: #CBC9DF;
    border-radius: 10px;
}

.content::-webkit-scrollbar-thumb {
    background: #5964DB;
    border-radius: 10px;
}

.introduce {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.rate {
    width: 40%;
    height: 100%;
    text-align: center;
    line-height: 172px;
    font-size: 32px;
    font-weight: bold;
    color: #657BBB;
}

.wordIntro {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    font-size: 14px;
    color: #9C9C9E;
}

.illustrate {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
}

.more {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
}

.top {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center
}

.pre,
.next {
    width: 40%;
    height: 70%;
    background-color: #5964DB;
    color: white;
    font-weight: bold;
    line-height: 45px;
    text-align: center;
    border-radius: 40px;
    cursor: pointer
}

.bottom {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

}

.downloadFile {
    width: 50%;
    height: 70%;
    background-color: #5964DB;
    color: white;
    font-weight: bold;
    line-height: 45px;
    text-align: center;
    border-radius: 40px;
    cursor: pointer
}

li {
    list-style-type: disc;
    font-size: 20px;
}

li span {
    font-size: 16px;
    color: #000;
}

.black {
    color: #000;
}

.orange {
    color: #E3925D;
}

.red {
    color: #D74117;
}
</style>