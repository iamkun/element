<template>
  <div >
    <span>{{config.name + config.key}}</span>
    <el-input
      :value=displayValue
    ></el-input>
    <el-color-picker 
      v-model="color" 
      size="mini"
      @change=onPickerChange
    ></el-color-picker>
  </div>
</template>

<style>
.main {}
</style>

<script>

export default {
  props: {
    config: {
      type: Object
    },
    userConfig: {
      type: Object
    },
    golbalColor: {
      type: Object
    }
  },
  data() {
    return {
      color: ''
    };
  },
  mounted() {
    if (this.displayValue.indexOf('#') === 0) {
      this.color = this.displayValue;
    }
  },
  computed: {
    displayValue() {
      return this.userConfig[this.config.key] || this.config.value;
    }
  },
  methods: {
    onPickerChange(e) {
      this.$emit('onChange', {
        key: this.config.key,
        value: e
      });
    }
  }
};
</script>