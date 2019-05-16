<template>
  <div>
    <div class="systemName">
      {{ systemName }}
    </div>
    <div class="page-top">
      <span
        v-for="one in options"
        :key="one.id"
        class="tag"
        :class="one.id===curType?'active':''"
        @click="()=>gotoPage(one)">
        {{ one.name }}
      </span>
    </div>
    <div class="content">
      <Brand
        v-show="curType=='brand'"
        ref="brand" />
      <Parts
        v-show="curType=='parts'"
        ref="parts" />
      <Production
        v-show="curType=='production'"
        ref="production" />
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
        systemId: '',
        curType: 'brand',
        options: [{ name: '车品牌字典', id: 'brand' }, { name: '配件品牌字典', id: 'parts' }, { name: '配件产地字典', id: 'production' }],
      };
    },
    computed: {
      systemName() {
        return this.$route.query.systemName;
      },
    },
    watch: {
      curType(val) {
        this.$refs[val].search();
      },
    },
    mounted() {
      this.$refs[this.curType].search();
    },

    methods: {
      gotoPage(one) {
        this.curType = one.id;
      },
    },

  };
</script>
<style lang="scss">

</style>
