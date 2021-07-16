<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background: white;
  line-height: 60px;
  font-size: 24px;
  border-bottom: 1px solid #ccc;
}
</style>
