<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content">
      <el-input 
        v-model="value"
        @blur="onBlur"
      ></el-input>
    </div>
  </section>
</template>

<script>
import Mixin from './mixin';
import { getStyleDisplayName } from '../utils/utils.js';

export default {
  props: {
    componentName: {
      type: String
    },
    golbalValue: {
      type: Object
    }
  },
  data() {
    return {
      value: ''
    };
  },
  mixins: [Mixin],
  computed: {
    displayName() {
      return getStyleDisplayName(this.config, this.componentName);
    }
  },
  methods: {
    onBlur(e) {
      this.onChange(e.target.value);
    }
  },
  watch: {
    'config.value': {
      immediate: true,
      handler(value) {
        this.value = this.mergedValue;
      }
    }
  }
};
</script>