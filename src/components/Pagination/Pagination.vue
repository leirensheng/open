<template>
  <el-pagination
    :current-page="this.currentPage"
    :page-sizes="this.pageSizes"
    :page-size="this.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    :total="this.total"
    @current-change="handleCurrentChange"
    class="right" />
</template>

<script>
  export default {
    props: ['total', 'currentPage', 'pageSize', 'pageSizes'],
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
      handleSizeChange(pageSize) {
        this.$emit('handleSizeChange', pageSize);
      },
      handleCurrentChange(currentPage) {
        this.$emit('handleCurrentChange', currentPage);
      },
    },
  };
</script>

<style scoped>
  .right {text-align: right; margin-top: 20px;}

</style>
