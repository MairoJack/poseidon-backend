<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Poseidon后台管理系统</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="validateForm"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button :loading="loading" type="primary" @click="submitForm()"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/index.js";
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const validateForm = ref(null);
    const state = reactive({
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
    });

    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };

    const submitForm = async () => {
      await validateForm.value.validate();
      state.login = true;
      login(state.loginForm).then((res) => {
        state.login = false;
        store.commit("SET_TOKEN", res);
        router.push(route.query.redirect || "/");
      });
    };

    return {
      ...toRefs(state),
      rules,
      validateForm,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/image/login-bg.jpeg");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #02183d;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
