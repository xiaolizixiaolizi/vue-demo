<template>
  <!-- <el-input v-model="myval" placeholder="请输入内容"></el-input> -->
  <input type="text" :value="value" @input="$emit('input', $event.target.value)">
</template>
<script>
export default {
  name: "MyInput",
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>