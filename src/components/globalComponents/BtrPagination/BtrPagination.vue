<template>
  <div class="base-btrPagination__wrap">
    <el-pagination
      :current-page="paginationParams.current"
      :page-sizes="[10,20,30,40]"
      :page-size="paginationParams.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script>
  export default {
    name: 'BtrPagination',
    components: {},
    props: {
      paginationParams: {
        type: Object,
        default: () => ({
          current: 1,
          size: 10,
        }),
      },
      totalCount: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleCurrentChange(val) {
        this.paginationParams.current = val;
        this.changePageParams();
      },

      handleSizeChange(val) {
        this.paginationParams.size = val;
        this.changePageParams();
      },

      changePageParams() {
        this.$emit('changePageParams');
      },
    },
  };
</script>

<style lang="scss">
  .base-btrPagination__wrap {
    margin-top: 20px;
    text-align: right;
  }
</style>
