<template>
  <div >
    <span>{{displayName}}</span>
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
import { getColorFromName, getStyleDisplayName } from '../utils/utils.js';

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
    },
    componentName: {
      type: String
    }
  },
  data() {
    return {
      color: ''
    };
  },
  watch: {
    displayValue: {
      immediate: true,
      handler(value) {
        if (value.startsWith('#')) {
          this.color = value;
        }
      }
    }
  },
  computed: {
    displayValue() {
      return getColorFromName(this.userConfig[this.config.key] || this.config.value, this.golbalColor);
    },
    displayName() {
      return getStyleDisplayName(this.config, this.componentName);
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