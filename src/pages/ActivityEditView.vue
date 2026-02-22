<script setup lang="ts">
import { ref, computed, toRaw, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useActivityStore } from '@/stores/activity.store'
import useActivityForm from '@/composables/useActivityForm'
import useActivityEdit from '@/composables/useActivityEdit'
import { useDirty} from '@/composables/useDirty'
import { useUnsavedLeaveGuard } from '@/composables/useUnsavedLeaveGuard'
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import type { ComputedRef } from 'vue'
import type { FormModel, ActivityResponse } from '@/services/index'

const route = useRoute()
const activityStore = useActivityStore()
const { formStatusOptions } = activityStore
const activityForm = useActivityForm()
const { ruleFormRef, rules } = activityForm
const activityEdit = useActivityEdit()

// 表單資料
const formModel = ref<FormModel>({
  title: '',
  id: '0',
  status: 'draft',
  createdAt: '',
  updatedAt: '',
  startAt: '',
  dueAt: '',
})

const snapShot = ref<FormModel>({
  title: '',
  id: '0',
  status: 'draft',
  createdAt: '',
  updatedAt: '',
  startAt: '',
  dueAt: '',
})


const { isDirty } = useDirty(snapShot, formModel)

useUnsavedLeaveGuard(isDirty, () => updateActivityData({ id: routeId.value, payload: formModel.value }))

const routeId: ComputedRef<string> = computed(()=>{
  return route.params.id as string
})

const updateActivityData = async ({ id, payload }: { id: string; payload: FormModel }): Promise<ActivityResponse | undefined> => {
  try {
    if (!ruleFormRef.value) {
      return { status: 'error', data: null, error: '表單未填寫完畢' }
    }

    const ifValid = await activityForm.formValidate(ruleFormRef.value)

    if (!ifValid) {
      return { status: 'error', data: null, error: '編輯頁驗證失敗' }
    }
    const res = await activityEdit.updateActivity({ id, payload })
    console.log('res',res);
    
    if(res?.status === 'success'){
      ElMessage({
        type: 'success',
        message: '資料已儲存',
      })
    }else{
      ElMessage({
        type: 'error',
        message: '資料儲存失敗，請稍後再試',
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error instanceof Error ? error.message : String(error)
    })
  }
}

const editReset = () => {
  activityForm.resetForm(formModel, snapShot)
}

const editSave = ()=>{
  updateActivityData({ 
    id: routeId.value, 
    payload: formModel.value 
  })
}

onMounted(async()=>{
  try{
    const res = await activityEdit.fetchActivityById(routeId.value)
    if(res?.status==='success'){
      formModel.value = structuredClone(toRaw(activityEdit.activityById.value))
      snapShot.value = structuredClone(toRaw(activityEdit.activityById.value))
    }else{
      ElMessage({
        type: 'error',
        message: '資料讀取失敗，請洽工作人員'
      })
    }
  }
  catch(error){
    ElMessage({
      type: 'error',
      message: error instanceof Error ? error.message : String(error)
    })
  }
})

</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-page)] py-24px min-w-768px">
    <div class="max-w-836px mx-auto px-24px">
      <!-- 頁面標題 -->
      <el-breadcrumb
        :separator-icon="ArrowRight"
        class="text-22px font-medium text-[var(--color-text-dark)] leading-28px mb-32px"
      >
        <el-breadcrumb-item :to="{ name: 'Activity' }">活動管理</el-breadcrumb-item>
        <el-breadcrumb-item>編輯活動</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 表單內容 -->
      <el-form :model="formModel" ref="ruleFormRef" :rules="rules" class="w-auto max-w-640px mx-auto">
        <!-- 活動名稱 -->
        <el-form-item label="活動名稱" prop="title">
          <el-input v-model="formModel.title" maxlength="20" placeholder="請填寫活動名稱" />
        </el-form-item>

        <!-- 活動狀態 -->
        <el-form-item label="活動狀態" prop="status">
          <el-select placeholder="請選擇活動狀態" v-model="formModel.status" class="w-full">
            <el-option v-for="status in formStatusOptions" :key="status.filterName" :label="status.name" :value="status.filterName" />
          </el-select>
        </el-form-item>

        <!-- 活動起日 -->
        <el-form-item label="活動起日" prop="startAt">
          <el-date-picker type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="請選擇活動起日" v-model="formModel.startAt" />
        </el-form-item>

        <!-- 活動迄日 -->
        <el-form-item label="活動迄日" prop="dueAt">
          <el-date-picker type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="請選擇活動迄日" v-model="formModel.dueAt" />
        </el-form-item>

        <!-- 操作按鈕 -->
        <el-form-item class="mt-64px">
          <div class="flex gap-44px justify-center w-full">
            <el-button @click="editReset"> 取消編輯 </el-button>
            <el-button @click="editSave" :disabled="!isDirty"> 儲存 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.el-button + .el-button {
  margin-left: 0px;
}
.el-breadcrumb__inner.is-link {
  @apply text-[var(--color-text-dark)];
}
</style>
