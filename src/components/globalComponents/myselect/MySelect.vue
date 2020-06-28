<template>
  <el-select
    v-if="options.length!==0"
    :value="value"
    @input="$emit('input',$event)"
    :placeholder="placeholder"
    :clearable="clearable"
  >
    <el-option
      v-for="item in options"
      :key="item[optionVal]"
      :label="item[label]"
      :value="item[optionVal]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: "MySelect",
  props: {
    options: {
      type: Array,
      required: true
    },
    // 绑定value是为了外面也可以传值改变到里面的值双向绑定
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: "请选择~~"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    //optionVal options里面每项对象的值
    optionVal: {
      type: [Number, String],
      default: "optionVal"
    },
    //lable options里面每项对象的标签
    label: {
      type: String,
      default: "lable"
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