<template>
  <div>
    <el-form v-show="isShow" ref="categoryForm" :model="categoryForm" label-width="120px">
      <el-form-item :label="label">
        <el-input v-model.trim="categoryForm.categoryName"></el-input>
      </el-form-item>
      <!-- 二级分类有无 -->
      <el-form-item label="父级分类名称" v-show="!isClickFirst">
        <el-input v-model.trim="categoryForm.parentName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">确定</el-button>
        <el-button type="primary" @click="handleHidden">隐藏添加框</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  addFirstCategory,
  addChildrenCategory,
  getCategory
} from "../../network/api";
export default {
  name: "InfoCategoryForm",
  props: {
    isClickFirst: {
      type: Boolean,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      categoryForm: {
        categoryName: "",
        parentName: ""
      },
      isLoading: false
    };
  },
  computed: {
    label() {
      return this.isClickFirst ? "一级分类名称" : "二级分类名称";
    }
  },
  methods: {
    onSubmit() {
      this.isClickFirst
        ? this.handleAddFirstCategory()
        : this.handleAddChildrenCategory();
    },

    handleAddFirstCategory() {
      if (this.categoryForm.categoryName == "") {
        return this.$message.info("一级分类名称不能为空");
      }
      this.isLoading = true;

      addFirstCategory({ categoryName: this.categoryForm.categoryName })
        .then(() => {
          this.isLoading = false;
          // this.$refs["categoryForm"].resetFields();
          this.categoryForm.
          this.$emit("refresh");
        })
        .catch(() => (this.isLoading = false));
    },

    handleAddChildrenCategory() {
      if (!this.categoryForm.categoryName || !this.categoryForm.parentName) {
        this.$message.error("二级分类名称或者父级分类名称不能为空");
        return false;
      }
      this.isLoading = true;
      const params = {
        categoryName: this.categoryForm.categoryName
      };
      // promise链式调用
      this.findParentIdByname(this.categoryForm.parentName)
        .then(data => {
          if (!data) {
            this.isLoading = false;
            this.$message.error("一级分类名称不存在");
            return;
          }
          params["parentId"] = data;
          addChildrenCategory(params)
            .then(() => {
              this.isLoading = false;
              // this.$refs["categoryForm"].resetFields();
              // this.categoryForm.categoryName=''
              // this.categoryForm.parentName=''
              this.$emit("refresh");
            })
            .catch(err => {
              this.isLoading = false;
              this.$message.error(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 根据父级name找到对应的父级的id
    findParentIdByname(parentName) {
      return getCategory()
        .then(data => {
          let parentArr = data.data.data.filter(
            e => e.category_name == parentName
          );
          if (parentArr.length == 0) {
            return null;
          }
          return parentArr[0].id;
        })
        .catch(err => err);
    },
    handleHidden() {
      this.$emit("update:isShow", false);
    },
    setFirstName(firstName) {
      this.categoryForm.parentName = firstName;
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
