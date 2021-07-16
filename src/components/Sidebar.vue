<template>
  <el-aside :width="asideWidth">
    <el-affix class="aside-logo">
      <div>
        <img src="@/assets/image/whale.png" />
        <p>Poseidon</p>
      </div>
    </el-affix>
    <el-menu
      router
      :default-active="$route.path"
      background-color="lightblue"
      :collapse="isCollapse"
    >
      <template v-for="menu in routers" :key="menu">
        <el-menu-item
          v-if="menu.children && menu.children.length === 1"
          :index="menu.children[0].path"
        >
          <i :class="menu.children[0].icon" />
          <template #title>{{ menu.children[0].name }}</template>
        </el-menu-item>
        <el-submenu v-else-if="menu.children" :index="menu.path">
          <template #title>
            <i :class="menu.icon" />
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.children"
            :key="child"
            :index="child.path"
          >
            <i :class="child.icon" />
            <template #title>
              {{ child.name }}
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { onBeforeMount, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      asideWidth: "200px",
      isCollapse: false,
      routers: [],
    });
    state.isCollapse = computed(() => {
      const isCollapse = store.state.isCollapse;
      if (store.state.isCollapse) {
        state.asideWidth = "64px";
      } else {
        state.asideWidth = "200px";
      }
      return isCollapse;
    });

    onBeforeMount(() => {
      state.routers = router.options.routes;
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  transition: all 0.5s;
  background-color: lightblue;
}
.el-aside::-webkit-scrollbar {
  width: 0;
}
.aside-logo {
  div {
    height: 59px;
    background-color: lightblue;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
      width: 48px;
    }
    p {
      margin-left: 15px;
    }
  }
}
.el-menu {
  border: none;
}
</style>
