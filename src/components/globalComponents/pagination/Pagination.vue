<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="paginationData.currentPage"
    :page-sizes="paginationData.pageSizes"
    :page-size="paginationData.PageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="paginationData.total"
  ></el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props:{
    paginationData:{
      type:Object,
      required:true
    }
  },
  data() {
    return {
     
    };
  },
  methods: {
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>