<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUpload, useFile } from './stores/counter';
import { onMounted } from 'vue';

const file = useFile()
const trial = useUpload()

function change(count) {
  trial.count2 = count
  if (trial.count2 == 1) {
    trial.count = 0
    trial.showArea = 0
  }
  
}



</script>

<template>
  <div class="all">
    <div class="inner">
      <div class="nav">
        <div class="left">
          <div class="title">Prose Sentry</div>
          <RouterLink to="/uploadMain">
            <div class="upload" :class="[{ 'active': trial.count2 == 1 }, { 'nonActive': trial.count2 != 1 }]"
              @click="change(1)">
              作文上传
            </div>
          </RouterLink>
          <RouterLink to="/detectMsg">
            <div class="result" :class="[{ 'active': trial.count2 == 2 }, { 'nonActive': trial.count2 != 2 }]"
              @click="change(2)">
              AI检测
            </div>
          </RouterLink>
          <RouterLink to="/feedback">
            <div class="feedback" :class="[{ 'active': trial.count2 == 3 }, { 'nonActive': trial.count2 != 3 }]"
              @click="change(3)">
              反馈收集
            </div>
          </RouterLink>
        </div>
        <div class="right">
          <el-icon :size='20' class="icon" color="#7F7F7F">
            <Clock />
            <User />
          </el-icon>
        </div>
      </div>
      <RouterView>

      </RouterView>

    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: inherit;
  color: inherit;
}

.all {
  margin: auto;
  width: 70vw;
  height: 90vh;
  position: relative;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 75%;
  /* background-color: red; */
}

.nav {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
}

.content {
  width: 100%;
  height: 90%;
}

.left {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.title,
.upload,
.result,
.feedback {
  width: 180px;
  height: 70%;
  text-align: center;
  line-height: 44.6px;
  font-weight: bold;
}

.title {
  font-size: 26px;
  color: #4C69EA;
}

.upload,
.result,
.feedback {
  color: white;
}

.active {
  color: white;
  background-color: #5D78EE;
  border-radius: 20px;
}

.nonActive {
  color: #A9A9A9;
  background-color: none;
  border-radius: 0;
}

.right {
  width: 15%;
  height: 100%;
}

.icon {
  float: right;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
