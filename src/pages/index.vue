<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <AsideCollapse />
            </el-aside>
            <el-container>
                <el-header>
                    <PageHeader />
                </el-header>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import AsideCollapse from './Aside-Collapse.vue';
import PageHeader from './Page-Header.vue';
</script>