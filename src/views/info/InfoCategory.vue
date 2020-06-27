<template>
  <div>
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="handleAddFirst">添加一级分类</el-button>
      <el-button type="primary" @click="handleAddSecond">添加二级分类</el-button>
    </div>
    <el-row :gutter="40">
      <el-col :span="12">
        <info-category-tree
          :tree-data="treeData"
          :is-show.sync="isShow"
          :is-click-first.sync="isClickFirst"
          @setCategoryName="setCategoryName"
        ></info-category-tree>
      </el-col>
      <el-col :span="10">
        <info-category-form
          :is-show.sync="isShow"
          ref="infoCategoryForm"
          :is-click-first="isClickFirst"
          @refresh="refresh"
        ></info-category-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategoryAll } from "../../network/api";
import InfoCategoryTree from "@/components/info/InfoCategoryTree";
import InfoCategoryForm from "@/components/info/InfoCategoryForm";
export default {
  name: "InfoCategory",
  components: {
    InfoCategoryTree,
    InfoCategoryForm
  },
  data() {
    return {
      isShow: false, //控制添加表单组件的有无 默认false隐藏
      isClickFirst: true, //默认点击的是一级分类
      treeData: []
    };
  },
  methods: {
    handleAddFirst() {
      this.isShow = true;
      this.isClickFirst = true;
    },
    handleAddSecond() {
      this.isShow = true;
      this.isClickFirst = false;
    },
    refresh() {
      this._getCategoryAll();
    },
    _getCategoryAll() {
      getCategoryAll()
        .then(data => (this.treeData = data.data))
        .catch(err => console.log(err));
    },
    setCategoryName(firstName) {
      this.$refs["infoCategoryForm"].setFirstName(firstName);
    }
  },
  mounted() {
    this._getCategoryAll();
  }
};
</script>
<style lang="scss" scoped></style>
