<template>
  <div>
    <h3>{{newsId}}</h3>
  </div>
</template>
<script>
export default {
  name: "InfoDetailed",
  props: {
    newsId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: ""
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>