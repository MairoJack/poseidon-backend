<template>
  <el-upload
    class="avatar-uploader"
    accept="image/jpeg,image/jpg,image/png"
    :action="uploadUrl"
    :show-file-list="false"
    :headers="{ Authorization: token }"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
  >
    <el-image v-if="fileName" :src="imageUrl" fit="contain" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { getStore } from "@/utils/storage";
import { reactive, toRefs, computed, watch } from "vue";
import { ElMessage } from "element-plus";
export default {
  props: {
    fileName: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      imagePrefix: `${import.meta.env.VITE_APP_IMAGE_PREFIX}`,
      uploadUrl: `${import.meta.env.VITE_APP_BASE_API}/medias/single`,
      token: `Bearer ${getStore("token")}`,
      imageUrl: "",
    });

    watch(
      () => props.fileName,
      (f) => {
        state.imageUrl = state.imagePrefix + f;
      },
      { immediate: true }
    );

    const beforeUpload = (file) => {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt2M) {
        ElMessage.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    };

    const handleSuccess = (res, file) => {
      if ((res.code = 200)) {
        emit("update:fileName", res.data);
      } else {
        ElMessage.error(res.msg);
      }
    };
    return {
      ...toRefs(state),
      beforeUpload,
      handleSuccess,
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
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  display: block;
  width: 160px;
  height: 160px;
}
</style>
