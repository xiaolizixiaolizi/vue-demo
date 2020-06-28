<template>
  <el-row>
    <el-col :span="12">
      <div class="info-search-left">
        <span>关键字</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <tree-select :data="options" @sendData="sendData"></tree-select>
        <el-button type="danger">搜索</el-button>
      </div>
    </el-col>

    <el-col :span="12">
      <div class="btn-add">
        <el-button type="danger">新增</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import TreeSelect from "@/components/common/TreeSelect";
export default {
  name: "UserInfoSearch",
  components: {
    TreeSelect
  },
  data() {
    return {
      input: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ]
    };
  },
  methods: {
    sendData(val) {
      this.value = val;
      console.log(this.value);
      
    }
  }
};
</script>
<style lang="scss" scoped>
.info-search-left {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  span {
    color: #606266;
  }
  .el-input {
    width: 200px;
  }
}

.btn-add {
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
}
</style>