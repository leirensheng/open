<template>
  <div>
    <div class="systemName">
      {{
        supplierName }}
    </div>
    <div class="page-top">
      <span
        v-for="one in options"
        :key="one.id"
        class="tag"
        :class="one.id===curType?'active':''"
        @click="()=>toggle(one)">
        {{ one.name }}
      </span>
    </div>
    <Part-Fail
      v-show="curType==='parts'"
      ref="parts"
      :basic-query-form="basicQueryForm" />
    <Price-Fail
      v-show="curType==='price'"
      ref="price"
      :basic-query-form="basicQueryForm" />
  </div>
</template>
<script>
  import PartFail from './components/parts.vue';
  import PriceFail from './components/price.vue';

  export default {
    name: 'Fail',
    components: {
      PartFail,
      PriceFail,
    },

    data() {
      return {
        curType: 'parts',
        options: [{ name: '同步基础属性接口', id: 'parts' }, { name: '同步价格库存接口', id: 'price' }],
      };
    },
    computed: {
      supplierId() {
        return this.$route.query.supplierId;
      },
      supplierName() {
        return this.$route.query.supplierName;
      },
      basicQueryForm() {
        return {
          systemId: this.$route.query.systemId,
          supplierId: this.supplierId,
        };
      },
    },
    activated() {
      this.search();
    },
    methods: {
      toggle(one) {
        this.curType = one.id;
        this.search();
      },
      search() {
        this.$refs[this.curType].search();
      },
    },
  };
</script>
<style lang="scss" scoped>
  .curSupplier{

  }
</style>
