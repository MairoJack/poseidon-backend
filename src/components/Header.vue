<template>
  <el-row :gutter="20">
    <el-col :span="1">
      <div class="header-collapse" @click="onCollapse">
        <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" />
      </div>
    </el-col>
    <el-col :span="10">
      <div class="header-breadcrumb">
        <el-breadcrumb
          separator="/"
          v-if="this.$route.matched[0].path != '/main'"
        >
          <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(matched, index) in this.$route.matched"
            :key="index"
            >{{ matched.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb separator="/" v-else>
          <el-breadcrumb-item>工作台</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
    <el-col :span="13" class="header-menu">
      <el-space wrap>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/image/whale.png" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            {{ $store.state.name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/">
                <el-dropdown-item>主页</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </el-col>
  </el-row>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      isCollapse: false,
    });
    const store = useStore();
    const router = useRouter();

    state.isCollapse = computed(() => store.state.isCollapse);
    const onCollapse = () => {
      store.commit("handleCollapse", !state.isCollapse);
    };

    const logout = () => {
      store.commit("CLEAR");
      router.push("/login");
    };
    return {
      ...toRefs(state),
      onCollapse,
      logout,
    };
  },
};
</script>

<style lang="scss">
.header-collapse {
  cursor: pointer;
}
.header-breadcrumb {
  padding-top: 0.9em;
}
.header-menu {
  text-align: right;
  .user-avator {
    margin-left: 20px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
}
</style>
