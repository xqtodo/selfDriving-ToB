<template>
    <el-table :data="spotTableData" style="width: 100%" :show-overflow-tooltip="true">
        <el-table-column fixed prop="id" label="用户ID" width="150" />
        <el-table-column prop="username" label="用户姓名" width="120" />
        <el-table-column prop="password" label="用户密码" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="email" label="邮箱" width="120" />
        <el-table-column prop="role" label="权限" width="150" />
        <!-- <el-table-column prop="detailPhoto" label="详情页图片地址" width="200" />
        <el-table-column prop="description" label="详情描述" width="500" /> -->
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" style="margin-left: 16px"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加用户</el-button>

    <el-drawer v-model="drawer" :data=changeSpot title="修改用户信息" :with-header="true">
        <div>
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="用户姓名">
                    <el-input v-model="changeSpot.value.username" />
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="changeSpot.value.password" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="changeSpot.value.phone" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="changeSpot.value.email" />
                </el-form-item>
                <!-- <el-form-item label="详情描述">
                    <el-input v-model="changeSpot.value.description" type="textarea" />
                </el-form-item> -->
                <el-form-item label="用户级别">
                    <el-radio-group v-model="changeSpot.value.role">
                        <el-radio value="普通用户">普通用户</el-radio>
                        <el-radio value="管理员">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifySpot">提交修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>

    <!-- <el-drawer v-model="drawer2" title="I am the title" :with-header="false">
        <span>Hi there!</span>
    </el-drawer> -->

    <el-drawer size="40%" v-model="drawer2" title="添加用户" :direction="direction">
        <div>
            <el-form v-model="formAdd" label-width="auto">
                <el-form-item label="用户姓名">
                    <el-input v-model="formAdd.username" />
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="formAdd.password" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formAdd.phone" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formAdd.email" />
                </el-form-item>
                <!-- <el-form-item label="用户级别">
                    <el-input v-model="formAdd.role" type="textarea" />
                </el-form-item> -->
                <el-form-item label="用户级别">
                    <el-radio-group v-model="formAdd.role">
                        <el-radio value="普通用户">普通用户</el-radio>
                        <el-radio value="管理员">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSpot">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>


</template>

<script lang="ts" setup>

import { onMounted, ref, reactive } from 'vue';
import { getUserAPI } from '../../apis/user'
import { modifyUserAPI } from '../../apis/user'
import { Plus } from '@element-plus/icons-vue'
import { deleteUserAPI } from '../../apis/user'
import { uploadAPI } from '../../apis/user'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { addUserAPI } from '../../apis/user'

const imageUrl = ref('')
const drawer = ref(false)
const drawer2 = ref(false)
const changeSpot = ref()
const spotTableData = ref([])
const direction = ref('ltr')

//获取景点列表
const getUserList = async () => {
    const res = await getUserAPI()
    spotTableData.value = res.data
}
onMounted(() => {
    getUserList()
})


//修改景点信息--------------------------------------
const handleEdit = (index, row) => {
    drawer.value = true
    console.log('修改用户信息')
    changeSpot.value = ref(row)
    console.log(123)
    console.log(changeSpot.value.value)
    console.log(123)
    console.log(index, row)
}
const modifySpot =  () => {
    const { id, username, password, phone, email, role } = changeSpot.value.value
    modifyUserAPI({ id, username, password, phone, email, role })
    drawer.value = false
}

//删除景点------------------------------------
const handleDelete = async(rowId) => {
    console.log('删除用户：'+rowId)
    await deleteUserAPI(rowId)
    getUserList()

}

//增加景点---------------------------------
const onAddItem = () => {
    console.log('添加用户')
    drawer2.value = true
}

const addSpot = async () => {
    await addUserAPI(formAdd)
    drawer2.value = false
    getUserList()
}
//增加景点数据
const formAdd = reactive({
    id: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    role: ''
})


</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>