<style>
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
  props: {
    config: {
      type: Object
    },
    userConfig: {
      type: Object
    }
  },
  computed: {
    mergedValue() {
      return this.userConfig[this.config.key] || this.config.value;
    }
  },
  methods: {
    onChange(value) {
      this.$emit('onChange', {
        key: this.config.key,
        value
      });
    }
  }
};
</script>