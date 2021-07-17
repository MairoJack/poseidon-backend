<template>
  <el-card>
    <div class="form-box">
      <el-form
        :model="dataForm"
        :rules="rules"
        ref="validateForm"
        label-width="100px"
      >
        <el-form-item label="活动主题" prop="subject">
          <el-input v-model="dataForm.subject" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="dataForm.name" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="date">
          <el-date-picker
            v-model="dataForm.date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-input v-model="dataForm.address" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="站点">
          <el-select v-model="dataForm.site" clearable placeholder="请选择站点">
            <el-option label="amazon" value="amazon"></el-option>
            <el-option label="shoppe" value="shoppe"></el-option>
            <el-option label="lazada" value="lazada"></el-option>
            <el-option label="wish" value="wish"></el-option>
            <el-option label="alibaba" value="alibaba"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动主图" prop="image">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted, toRefs, unref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const validateForm = ref(null);
    const state = reactive({
      imageUrl: "",
      dataForm: {
        subject: "",
        name: "",
        date: "",
        address: "",
        site: "",
      },
    });

    const rules = {
      subject: [{ required: true, message: "请输入主题", trigger: "blur" }],
      name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
    };

    onMounted(() => {
      const route = useRoute();
      if (route.params.id) {
        console.log("编辑:需要获取数据");
      } else {
        console.log("添加:不需要获取数据");
      }
    });
    const onSubmit = () => {
      validateForm.value.validate((valid) => {
        if (valid) {
          ElMessage.success("提交成功！");
        }
      });
    };

    const handleAvatarSuccess = (res, file) => {
      state.imageUrl = URL.createObjectURL(file.raw);
    };
    return {
      ...toRefs(state),
      rules,
      validateForm,
      onSubmit,
      handleAvatarSuccess,
    };
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
