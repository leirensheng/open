<template>
  <div
    id="container"
    :class="isCollapse?'isCollapse':''">
    <div id="content">
      welcome
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'sidebar',
      ]),
      isCollapse() {
        return !this.sidebar.opened;
      },
    },
    mounted() {
      this.$store.commit('SHOW_SIDEBAR');
    },

  };
</script>
<style lang="scss" scoped>
     #container{
       position: fixed;
       top:86px;
       right: 0;
       bottom: 0;
       left:180px;
       display: flex;
       align-items: center;
       background-color: #2D3A4B;
       justify-content: center;
       &.isCollapse{
         left:50px;
       }
      #content{
        width:445px;
        height:65px;
        font-size:82px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:32px;
      }
     }
</style>
