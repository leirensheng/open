<template>
  <div class="btrCollapseTransition__wrap">
    <div
      class="btrCollapseTransition-title"
      @click="$emit('update:isActive', !isActive)">
      <slot
        name="title" />
    </div>
    <i
      class="collapse__arrow el-icon-arrow-right"
      :class="{ 'is-active' : isActive }" />
    <CollapseTransition>
      <div
        v-show="isActive"
        class="collapseContent__wrap">
        <slot name="collapseContent" />
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
  import CollapseTransition from './CollapseTransition';

  export default {
    name: 'BtrCollapseTransition',
    components: {
      CollapseTransition,
    },
    props: {
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="scss">
  .btrCollapseTransition-title {
    cursor: pointer;
  }
  .btrCollapseTransition__wrap {
    position: relative;
  }
  .collapse__arrow {
    position: absolute;
    top: 23px;
    right: 20px;
    z-index: 1;
    margin: 0 8px 0 auto;
    transition: transform .3s;
    font-weight: 300;
    &.is-active {
      transform: rotate(90deg);
    }
  }
</style>
