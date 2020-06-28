<template>
  <el-select
    v-if="data.length!==0"
    v-model="value"
    placeholder="请选择"
    @change="handleChange"
    clearable
  >
    <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  name: "TreeSelect",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleChange(val) {
      this.$emit("sendData", this.value);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>