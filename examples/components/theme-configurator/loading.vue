<style>
  .loadingClass {
    z-index: 0!important;
    .el-loading-spinner {
      top: 0%;
      margin-top: 30%;
    }
  }
</style>
<script>

import bus from '../../bus.js';
import './progress.js';

export default {
  data() {
    return {
      loadingInstance: null,
      count: 0
    };
  },
  created() {
    bus.$on('user-theme-config-loading', val => {
      if (val) {
        this.count++;
        if (this.count > 1) return;
        this.$bar.start();
        this.loadingInstance = this.$loading(
          {
            target: '.page-component__content .content',
            customClass: 'loadingClass'
          }
        );
      } else {
        this.count--;
        if (this.count) return;
        this.$bar.finish();
        this.loadingInstance && this.loadingInstance.close();
      }
    });
  }
};
</script>
