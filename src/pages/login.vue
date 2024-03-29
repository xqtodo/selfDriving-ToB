<template>
    <el-row class="min-h-screen bg-sky-400">
        <el-col :lg="16" :md="12" class="flex items-center justify-center">
            <div>
                <div style="font-family: Verdana, Geneva, Tahoma, sans-serif;"
                    class="font-bold text-6xl text-light-100 mb-4">Self-Driving-Tour</div>
                <div align="center" class="mb-2 text-light-100 text-2xl">基于SpringBoot的自驾游系统</div>
                <div align="center" style="font-family: 幼圆;" class="text-amber-900 text-3xl bg-light-100 rounded-3xl">
                    李晓庆
                </div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="bg-light-100 flex items-center justify-center flex-col">
            <span class="text-6xl text-sky-500 mb-4">入口</span>
            <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px] w-16 bg-gray-200"></span>
            </div>
            <el-form :model="form" :rules="rules" class="w-[250px]" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="w-[100px]">登录</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="primary" @click="onRegistered" class="w-[100px]">注册</el-button>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
import { login } from '../apis/users'
// import { User,Lock } from '@element-plus/icons-vue'
// do not use same name with ref
const router = useRouter()

const form = reactive({
    username: '',
    password: '',
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 10, message: '长度需要5-10个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 10, message: '长度需要5-10个字符', trigger: 'blur' }
    ]
}
const formRef = ref(null)
const onSubmit = () => {
    // console.log(form.username)
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        login(form.username, form.password)
            .then(res => {
                console.log(res)

                const cookie = useCookies()
                cookie.set('token',res.token)
                router.push('/index')
            })
            .catch(err => {
  
            })
    })
}
const onRegistered = () => {
    console.log('注册')
    console.log(form.username)
    console.log(form.password)
    router.push('/register')
}

</script>

<style lang="scss" scoped></style>