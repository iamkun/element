<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content">
      <el-input 
        @keyup.enter.native="onUpdate"
        v-model="value"
        @blur="onUpdate"
      ></el-input>
    </div>
  </section>
</template>

<script>
import Mixin from './mixin';

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
      value: '',
      oldValue: ''
    };
  },
  mixins: [Mixin],
  methods: {
    onUpdate(e) {
      const { value } = e.target;
      if (value !== this.oldValue) {
        this.oldValue = value;
        this.onChange(value);
      }
    }
  },
  watch: {
    'config.value': {
      immediate: true,
      handler(value) {
        this.value = this.mergedValue;
        if (!this.oldValue) {
          this.oldValue = this.value;
        }
      }
    }
  }
};
</script>