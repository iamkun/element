<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content">
      <el-select 
        v-model="value" 
        class="select"
        @change="onSelectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<style lang="postcss">
.select {
  width: 100%;
}
</style>

<script>
const defaultFontWeight = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'inherit'
];
import Mixin from './mixin';
import { getStyleDisplayName } from '../utils/utils.js';

export default {
  props: {
    config: {
      type: Object
    },
    userConfig: {
      type: Object
    },
    componentName: {
      type: String
    }
  },
  data() {
    return {
      options: [],
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
    onSelectChange(e) {
      this.onChange(e);
    },
    onChange(value) {
      this.$emit('onChange', {
        key: this.config.key,
        value
      });
    }
  },
  created() {
    defaultFontWeight.forEach((weight) => {
      this.options.push({
        value: weight,
        label: weight
      });
    });
    this.value = this.config.value;
  }
};
</script>