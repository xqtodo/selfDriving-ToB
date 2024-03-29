<template>
    <el-row class="min-h-screen bg-light-200">

        <el-col :span="12" class="bg-sky-200 flex items-center justify-center " :offset="6">

            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <div align="center" class="text-blue-500 text-5xl mb-6 tracking-widest font-serif">
                    用户注册
                </div>
                <el-form-item label="用户名">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item :offset="8">
                    <span style="position: relative; left: 100px;">
                        <el-button type="primary" @click="onSubmit">点击注册</el-button>
                    </span>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import {reactive} from 'vue'
import { useRouter } from 'vue-router';
import { register } from '../apis/users'
import axios from 'axios';

const router = useRouter()
// do not use same name with ref
const form = reactive({
    name: '',
    password: '',
    email: '',
    phone: ''
})

const onSubmit = () => {
    register(form.name,form.password,form.email,form.phone).then((res) => {
        router.push('/login')
    })
}
</script>
