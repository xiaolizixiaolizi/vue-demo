<template>
  <div>
    <h3>{{ loadingMessage }}</h3>
    <h3>{{ aa }}</h3>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    aa: {
      type: String
    }
  },
  data() {
    return {
      loadingMessage: "loading..."
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
