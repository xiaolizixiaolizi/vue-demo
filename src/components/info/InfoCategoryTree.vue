<template>
  <el-tree
    v-if="treeData.length !== 0"
    :data="treeData"
    :props="defaultProps"
   
  >
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>

      <span>
        <el-button
          v-if="node.level == 1"
          type="primary"
          size="mini"
          @click="append(node, data)"
        >添加子集</el-button>
        <el-button type="success" size="mini" @click="edit(node, data)">编辑</el-button>
        <el-button type="danger" size="mini" @click="remove(node,data)">删除</el-button>
      </span>
    </span>
  </el-tree>
</template>
<script>
import { deleteCategory } from "../../network/api";
export default {
  name: "InfoCategoryTree",
  props: {
    treeData: {
      type: Array,
      required: true
    },
    isShow:{
      type:Boolean,
      required:true
    },
    isClickFirst:{
      type:true,
      required:true
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "category_name"
      }
    };
  },
  methods: {
    append(node,data){
      // console.log(data)
      this.$emit('update:isShow',true)
      this.$emit('update:isClickFirst',false)
      this.$emit('setCategoryName',data.category_name)

      
    },
   
    edit(node, data) {
      console.log("node: ", node);
      console.log("data: ", data);
    },
    remove(node, row) {
      this._confirm("删除此条数据无法恢复，是否继续?", () =>
        this.handleRemoveConfirm(node, row)
      );
    },

    handleRemoveConfirm(node, row) {
      deleteCategory({ categoryId: row.id })
        .then(data => {
          this.$message.success(data.message);
          // 后天数据库已经删除，但是前面页面没有刷新，这里实现模拟刷新
          // 方法1：数组同基本数据类型看待，要显式通知父组件update:
          // const res= this.treeData.filter(e => e.id !== row.id);
          // this.$emit("update:treeData", res);

          //方法2：实现删除数组里面特定的项，父组件的值同时被修改（不用通知父组件）
          // 分两种情况，第一种是删除父节点
          if (!row.parent_id) {
            let index = this.treeData.findIndex(e => e.id === row.id);
            this.treeData.splice(index, 1);
          } else {
            // 删除某一个父节点下面的子节点数据
            // console.log(this.treeData)
            let parentNode = this.treeData.find(e => e.id === row.parent_id);
            let secondIndex = parentNode.children.findIndex(e => e.id === row.id);
            parentNode.children.splice(secondIndex, 1);
            // console.log(this.treeData)

          }
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
   
  },
  created() {}
};
</script>
<style lang="scss">
// tree
.el-tree {
  .el-tree-node__content {
    height: 50px !important;
  }
}
</style>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
