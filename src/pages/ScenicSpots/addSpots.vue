<template>
    <el-table :data="spotTableData" style="width: 100%" :show-overflow-tooltip="true">
        <el-table-column fixed prop="id" label="景点ID" width="150" />
        <el-table-column prop="name" label="景点名称" width="120" />
        <el-table-column prop="location" label="景点地址" width="120" />
        <el-table-column prop="price" label="景点优惠价格" width="120" />
        <el-table-column prop="oldPrice" label="景点价格" width="120" />
        <el-table-column prop="description" label="景点介绍" width="150" />
        <el-table-column prop="photoUrl" label="景点图片地址" width="200" />
        <el-table-column prop="detailPhoto" label="详情页图片地址" width="500" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" style="margin-left: 16px"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加景点</el-button>

    <el-drawer v-model="drawer" :data=changeSpot title="修改景点信息" :with-header="true">
        <div>
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="景点名称">
                    <el-input v-model="changeSpot.value.name" />
                </el-form-item>
                <el-form-item label="景点地址">
                    <el-input v-model="changeSpot.value.location" />
                </el-form-item>
                <el-form-item label="景点优惠价格">
                    <el-input v-model="changeSpot.value.price" />
                </el-form-item>
                <el-form-item label="景点价格">
                    <el-input v-model="changeSpot.value.oldPrice" />
                </el-form-item>
                <el-form-item label="景点介绍">
                    <el-input v-model="changeSpot.value.description" type="textarea" />
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

    <el-drawer size="40%" v-model="drawer2" title="添加景点" :direction="direction">
        <div>
            <el-form v-model="formAdd" label-width="auto">
                <el-form-item label="景点名称">
                    <el-input v-model="formAdd.name" />
                </el-form-item>
                <el-form-item label="景点地址">
                    <el-input v-model="formAdd.location" />
                </el-form-item>
                <el-form-item label="景点优惠价格">
                    <el-input v-model="formAdd.price" />
                </el-form-item>
                <el-form-item label="景点价格">
                    <el-input v-model="formAdd.oldPrice" />
                </el-form-item>
                <el-form-item label="景点介绍">
                    <el-input v-model="formAdd.description" type="textarea" />
                </el-form-item>
                <el-form-item label="景点图片" label-width="100">
                    <el-upload class="avatar-uploader" action="http://localhost:8080/upload/image"
                        list-type="picture-card" :show-file-list="true" :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
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
import { getSpotsAPI } from '../../apis/spots'
import { modifySpotAPI } from '../../apis/spots'
import { Plus } from '@element-plus/icons-vue'
import { addSpotAPI } from '../../apis/spots'
import { deleteSpotAPI } from '../../apis/spots'
import { uploadAPI } from '../../apis/spots'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const drawer = ref(false)
const drawer2 = ref(false)
const changeSpot = ref()
const spotTableData = ref([])
const direction = ref('ltr')

//获取景点列表
const getSpotsList = async () => {
    const res = await getSpotsAPI()
    spotTableData.value = res.data
}
onMounted(() => {
    getSpotsList()
})


//修改景点信息--------------------------------------
const handleEdit = (index, row) => {
    drawer.value = true
    console.log('修改景点')
    changeSpot.value = ref(row)
    console.log(123)
    console.log(changeSpot.value.value)
    console.log(123)
    console.log(index, row)
}
const modifySpot =  () => {
    const { id, name, location, price, oldPrice, description } = changeSpot.value.value
    modifySpotAPI({ id, name, location, price, oldPrice, description })
    drawer.value = false
}

//删除景点------------------------------------
const handleDelete = async(rowId) => {
    console.log('删除景点：'+rowId)
    await deleteSpotAPI(rowId)
    getSpotsList()

}

//增加景点---------------------------------
const onAddItem = () => {
    console.log('添加景点')
    drawer2.value = true
}
const handleAvatarSuccess= (res, file) => {
    console.log(res)
    formAdd.photoUrl = res.data
    console.log(file)
}
const addSpot = async () => {
    await addSpotAPI(formAdd)
    drawer2.value = false
    getSpotsList()
}
//增加景点数据
const formAdd = reactive({
    id: '',
    name: '',
    location: '',
    price: '',
    oldPrice: '',
    description: '',
    photoUrl: '',
    detailPhoto: ''
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