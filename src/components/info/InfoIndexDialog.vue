<template>
  <!-- dialogVisible父组件提供，:visible.sync直接修改父组件的dialogVisible，会报错，需要加上before-close属性 -->
  <el-dialog
    title="新加"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleBeforeClose"
    @close="handleAfterClose"
  >
    <el-form :model="infoIndexDialogForm" label-width="100px" ref="infoIndexDialogForm">
      <el-form-item label="分类" v-if="options.length!==0" prop="category">
        <el-select v-model.number="infoIndexDialogForm.category" style="width:100%">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="infoIndexDialogForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" autosize v-model="infoIndexDialogForm.content" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handle" :loading="isLoading">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { newAdd } from "@/network/api";
export default {
  name: "InfoIndexDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    options: {
      type: Array
    }
  },
  data() {
    return {
      infoIndexDialogForm: {
        category: "",
        title: "",
        content: ""
      },
      isLoading:false //设置为true 表示在数据加载请求中，不可再次点击
    };
  },
  methods: {
    changePropsDialogVisible() {
      this.$emit("update:dialogVisible", false);
    },
    handleBeforeClose() {
      this.changePropsDialogVisible();
    },
    handleAfterClose() {
      // 关闭对话框之后清除页面表单属性
      this.$refs["infoIndexDialogForm"].resetFields();
    },
    handleCancel() {
      this.changePropsDialogVisible();
    },
    handle() {
      if (
        !this.infoIndexDialogForm.category ||
        !this.infoIndexDialogForm.title
      ) {
        this.$message.error("分类或者标题都不能为空");
        return;
      }
      this.changePropsDialogVisible();
 
      newAdd(this.infoIndexDialogForm)
        .then(data => {
          this.$message.success(data.message);
          this.$emit('refresh')
          
        })
        .catch(() => {
          this.$message.error("添加新闻数据失败");
        });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>