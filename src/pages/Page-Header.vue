<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">
            <!-- <img style="width: auto " src="../images/icon/paimon.avif" alt="Element logo" /> -->
            <span class="text-1xl text-blue-400" @click="toIndex">自驾游系统后台管理页面</span>
        </el-menu-item>
        <div class="flex-grow" />
        <!-- <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2">
            <template #title>控制台</template>
            <el-menu-item index="2-1">人员管理</el-menu-item>
            <el-menu-item index="2-2">景点管理</el-menu-item>
            <el-menu-item index="2-3">线路管理</el-menu-item>
            <el-menu-item index="2-3">评论管理</el-menu-item>
        </el-sub-menu> -->
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

function toIndex() {
    router.push('/index')
}


const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>