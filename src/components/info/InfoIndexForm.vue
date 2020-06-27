<template>
  <el-row class="Info-index-form">
    <el-col :span="5">
      <span class="label-txt">分类</span>
      <el-select v-if="options.length!==0" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <span class="label-txt">日期</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-col>
    <el-col :span="9">
      <span class="label-txt">关键字</span>
      <el-select v-model="value1" placeholder="ID">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">搜索</el-button>
    </el-col>
    <el-col :span="1">
      <el-button type="success" @click="changeDialogVisible">新加</el-button>
    </el-col>
  </el-row>
</template>
<script>
import { getCategory, getCategoryAll } from "@/network/api";
export default {
  name: "InfoIndexForm",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      options: [],
      value: "",

      value1: "",
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      date: "",
      input: ""
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    changeDialogVisible() {
      this.$emit("update:dialogVisible", true);
    }
  },
  mounted() {
    getCategoryAll()
      .then(data => {
        const res = data.data;
        res.forEach(e => {
          this.options.push({ value: e.id, label: e.category_name });
          this.$emit('receiveOptions',this.options)
        });
      })
      .catch(err => err);
  }
};
</script>
<style lang="scss" scoped>
.Info-index-form {
  .el-col {
    .label-txt {
      margin-right: 15px;
      font-size: 14px;
      color: #606266;
    }
    &:nth-child(1) {
      .el-select {
        width: 140px;
      }
    }
    &:nth-child(3) {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      .label-txt {
        margin-right: 0;
      }
      .el-select {
        width: 70px;
      }
      .el-input {
        width: 130px;
      }
    }
  }
}
</style>
