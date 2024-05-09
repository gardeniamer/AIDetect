<script setup>
import { ref } from 'vue';

const fullscreenLoading = ref(true)
</script>

<template>
    <div v-show="true">
        <el-button v-loading.fullscreen.lock="fullscreenLoading"></el-button>
    </div>
</template>

<style scoped>

</style>