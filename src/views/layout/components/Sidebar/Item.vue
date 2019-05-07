<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },
    render(h, context) {
      const { icon, title } = context.props;
      const vnodes = [];
      if (icon) {
        vnodes.push(<SvgIcon class='icon-menuItem' icon-class={`icon-${icon}`} />);
      }

      if (title) {
        vnodes.push(<span class="menuItem-title" slot="title">{title}</span>);
      }
      return vnodes;
    },
  };
</script>
<style lang="scss" scoped>
.icon-menuItem {
  font-size: 20px;
  vertical-align: middle;
}
.menuItem-title {
  margin-left: 15px;
}
</style>
