<template>
  <div>
    <div class="page-top">
      <span
        v-for="one in options"
        :key="one.id"
        class="tag"
        :class="one.id===curPage?'active':''"
        @click="()=>gotoPage(one)">
        {{ one.name }}
      </span>
    </div>
    <div class="content">
      <Brand v-show="curPage=='brand'" />
      <Parts v-show="curPage=='parts'" />
      <Production v-show="curPage=='production'" />
    </div>
  </div>
</template>
<script>
  import Brand from './components/Brand.vue';
  import Parts from './components/Parts.vue';
  import Production from './components/Production.vue';

  export default {
    name: 'Dict',
    components: {
      Brand,
      Parts,
      Production,
    },
    data() {
      return {
        curPage: 'brand',
        options: [{ name: '车品牌字典', id: 'brand' }, { name: '配件品牌字典', id: 'parts' }, { name: '配件产地字典', id: 'production' }],
      };
    },
    methods: {
      gotoPage(one) {
        this.curPage = one.id;
      },
    },
  };
</script>
<style lang="scss">

</style>
