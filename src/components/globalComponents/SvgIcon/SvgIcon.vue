<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        required: true,
      },
    },
    computed: {
      iconName() {
        return `#${this.iconClass}`;
      },
    },
  };
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  font-size: 16px;
  fill: currentColor;
  overflow: hidden;
}
</style>
