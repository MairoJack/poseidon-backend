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
          <el-input v-model.trim="dataForm.subject" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model.trim="dataForm.name" maxlength="30"></el-input>
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
          <el-input v-model.trim="dataForm.address" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="site">
          <el-select v-model="dataForm.site" clearable placeholder="请选择站点">
            <el-option label="amazon" value="amazon"></el-option>
            <el-option label="shoppe" value="shoppe"></el-option>
            <el-option label="lazada" value="lazada"></el-option>
            <el-option label="wish" value="wish"></el-option>
            <el-option label="alibaba" value="alibaba"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动主图" prop="mainImage">
          <Uploader v-model:fileName="dataForm.mainImage" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="onSubmit"
            >保存
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted, toRefs, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Uploader from "@/components/Uploader.vue";
import { getLecture, addLecture, modifyLecture } from "@/api/index.js";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const validateForm = ref(null);
    const state = reactive({
      dataForm: {
        mainImage: "",
        subject: "",
        name: "",
        date: "",
        address: "",
        site: "",
      },
      loading: false,
    });
    const rules = {
      subject: [{ required: true, message: "请输入主题", trigger: "blur" }],
      name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      date: [{ required: true, message: "请选择活动时间", trigger: "change" }],
      address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      site: [{ required: true, message: "请选择站点", trigger: "change" }],
      mainImage: [{ required: true, message: "请选择主图", trigger: "change" }],
    };

    onMounted(() => {
      if (route.params.id) {
        //编辑/详情 需要获取数据
        getLecture(route.params.id).then((res) => {
          state.dataForm = Object.assign({}, res);
        });
      }
    });
    const onSubmit = async () => {
      await validateForm.value.validate();
      state.loading = true;
      try {
        await addLecture(state.dataForm);
        ElMessage.success("添加成功");
        router.back(-1);
      } finally {
        state.loading = false;
      }
    };

    return {
      ...toRefs(state),
      rules,
      validateForm,
      onSubmit,
    };
  },

  components: {
    Uploader,
  },
};
</script>

<style></style>
