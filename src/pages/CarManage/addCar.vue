<template>
    <el-table :data="spotTableData" style="width: 100%" :show-overflow-tooltip="true">
        <el-table-column fixed prop="id" label="汽车ID" width="150" />
        <el-table-column prop="vehicleBrand" label="汽车品牌" width="120" />
        <el-table-column prop="vehicleModel" label="汽车型号" width="120" />
        <el-table-column prop="price" label="租车折扣价格" width="120" />
        <el-table-column prop="oldPrice" label="租车价格" width="120" />
        <el-table-column prop="photoUrl" label="图片地址" width="150" />
        <el-table-column prop="detailPhoto" label="详情页图片地址" width="200" />
        <el-table-column prop="description" label="详情描述" width="500" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" style="margin-left: 16px"
                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加车辆</el-button>

    <el-drawer v-model="drawer" :data=changeSpot title="修改车辆信息" :with-header="true">
        <div>
            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="汽车名称">
                    <el-input v-model="changeSpot.value.vehicleBrand" />
                </el-form-item>
                <el-form-item label="汽车型号">
                    <el-input v-model="changeSpot.value.vehicleModel" />
                </el-form-item>
                <el-form-item label="租车折扣价格">
                    <el-input v-model="changeSpot.value.price" />
                </el-form-item>
                <el-form-item label="租车价格">
                    <el-input v-model="changeSpot.value.oldPrice" />
                </el-form-item>
                <el-form-item label="详情描述">
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

    <el-drawer size="40%" v-model="drawer2" title="添加车辆" :direction="direction">
        <div>
            <el-form v-model="formAdd" label-width="auto">
                <el-form-item label="汽车名称">
                    <el-input v-model="formAdd.vehicleBrand" />
                </el-form-item>
                <el-form-item label="汽车型号">
                    <el-input v-model="formAdd.vehicleModel" />
                </el-form-item>
                <el-form-item label="租车折扣价格">
                    <el-input v-model="formAdd.price" />
                </el-form-item>
                <el-form-item label="租车价格">
                    <el-input v-model="formAdd.oldPrice" />
                </el-form-item>
                <el-form-item label="详细描述">
                    <el-input v-model="formAdd.description" type="textarea" />
                </el-form-item>
                <el-form-item label="汽车图片" label-width="100">
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
import { getCarAPI } from '../../apis/car'
import { modifyCarAPI } from '../../apis/car'
import { Plus } from '@element-plus/icons-vue'
import { addCarAPI } from '../../apis/car'
import { deleteCarAPI } from '../../apis/car'
import { uploadAPI } from '../../apis/car'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const drawer = ref(false)
const drawer2 = ref(false)
const changeSpot = ref()
const spotTableData = ref([])
const direction = ref('ltr')

//获取景点列表
const getCarList = async () => {
    const res = await getCarAPI()
    spotTableData.value = res.data
}
onMounted(() => {
    getCarList()
})


//修改景点信息--------------------------------------
const handleEdit = (index, row) => {
    drawer.value = true
    console.log('修改路线')
    changeSpot.value = ref(row)
    console.log(123)
    console.log(changeSpot.value.value)
    console.log(123)
    console.log(index, row)
}
const modifySpot =  () => {
    const { id, vehicleBrand, vehicleModel, price, oldPrice, description } = changeSpot.value.value
    modifyCarAPI({ id, vehicleBrand, vehicleModel, price, oldPrice, description })
    drawer.value = false
}

//删除景点------------------------------------
const handleDelete = async(rowId) => {
    console.log('删除路线：'+rowId)
    await deleteCarAPI(rowId)
    getCarList()

}

//增加景点---------------------------------
const onAddItem = () => {
    console.log('添加路线')
    drawer2.value = true
}
const handleAvatarSuccess= (res, file) => {
    console.log(res)
    formAdd.photoUrl = res.data
    console.log(file)
}
const addSpot = async () => {
    await addCarAPI(formAdd)
    drawer2.value = false
    getCarList()
}
//增加景点数据
const formAdd = reactive({
    id: '',
    vehicleBrand: '',
    vehicleModel: '',
    price: '',
    oldPrice: '',
    photoUrl: '',
    detailPhoto: '',
    description: ''
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