<template>
    <!-- <el-col :sm="12" :lg="6"> -->
      <el-result
        icon="error"
        title="404"
        sub-title="请求页面不存在"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    <!-- </el-col> -->
</template>