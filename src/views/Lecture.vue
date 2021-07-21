<template>
  <el-card>
    <div class="handle-box">
      <el-input
        v-model="query.name"
        placeholder="活动讲座名称"
        class="handle-input mr10"
      ></el-input>
      <el-select
        v-model="query.site"
        clearable
        placeholder="请选择站点"
        class="handle-select mr10"
      >
        <el-option key="1" label="amazon" value="amazon"></el-option>
        <el-option key="2" label="shoppe" value="shoppe"></el-option>
        <el-option key="3" label="lazada" value="lazada"></el-option>
        <el-option key="4" label="wish" value="wish"></el-option>
        <el-option key="5" label="alibaba" value="alibaba"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch"
        >搜索</el-button
      >
    </div>
    <el-divider></el-divider>
    <el-table :data="list">
      <el-table-column
        prop="subject"
        label="活动主题"
        show-overflow-tooltip
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        show-overflow-tooltip
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="date" label="活动时间" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        show-overflow-tooltip
        label="地点"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="site" label="站点" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <router-link class="mr10" :to="'/lecture-edit/' + scope.$index">
            <el-button type="text" icon="el-icon-edit">编辑 </el-button>
          </router-link>
          <el-button
            type="text"
            icon="el-icon-delete"
            class="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="pager.current"
        page-size="10"
        :total="pager.total"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import {
  getLecturePage,
  getLecture,
  addLecture,
  modifyLecture,
} from "@/api/index.js";
import { ref, reactive, onMounted, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      list: [],
      pager: {
        current: 1,
        total: 0,
      },
      query: {
        name: "",
        site: "",
      },
    });

    onMounted(() => {
      init();
    });

    const init = () => {
      getLecturePage(state.query).then((res) => {
        state.list = res.records;
        state.pager.total = res.total;
      });
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
