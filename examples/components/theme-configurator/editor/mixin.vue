<style lang="postcss">
    .config {
      padding: 10px 0;
    }
    .config-label {
      color: #666;
      font-size: 14px;
      padding-bottom: 5px;
    }
    .config-content {

    }
    .content-80 {
      display: inline-block;
      width: 80%;
    }
    .content-20 {
      display: inline-block;
      width: 20%;
      vertical-align: bottom;
    }
</style>
<script>
export default {
  computed: {
    mergedValue() {
      return this.userConfig[this.config.key] || this.config.value;
    }
  }
};
</script>