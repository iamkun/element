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
    componentName: {
      type: String
    },
    golbalValue: {
      type: Object
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
    },
    isGlobalInputValue() {
      return this.config.value.startsWith('$');
    }
  },
  methods: {
    onSelectChange(e) {
      this.onChange(e);
    }
  },
  created() {
    defaultFontWeight.forEach((weight) => {
      this.options.push({
        value: weight,
        label: weight
      });
    });
    const golbalTypography = this.golbalValue.typography;
    if (this.isGlobalInputValue && golbalTypography) {
      Object.keys(golbalTypography).forEach((font) => {
        if (font.includes('font-weight')) {
          const weight = golbalTypography[font];
          this.options.push({
            value: weight.key,
            label: getStyleDisplayName(weight)
          });
        }
      });
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