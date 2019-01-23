<template>
  <div :key="displayName">
    <span>{{displayName}}</span>
    <el-popover
      ref="popover"
      placement="top-start"
      :trigger="popoverTrigger"
    >
      <ul
      class="color-list"
      >
        <li
          v-for="(color, key) in golbalColorList" 
          :key="key"
          :style="{ 
            backgroundColor: color.color,
            color: color.colorInvert
          }"
          @click="onListColorClick(color)"
          class="list-item"
        >
          {{color.label}}
          {{color.color}}
        </li>
      </ul>
      <el-input
        style="width: 200px"
        :value=displayValue
        readonly
        slot="reference"
      ></el-input>
    </el-popover>
    <el-color-picker 
      class="colorPicker"
      v-model="pickerColor" 
      @change=onPickerChange
    ></el-color-picker>
  </div>
</template>

<style lang="postcss">
.colorPicker {
  vertical-align: bottom;
  margin-left: 10px;
}
.color-list {
  margin: 0;
  padding: 0;
  list-style: none;
  .list-item {
    height: 40px;
  }
}
</style>

<script>
import { getColorFromName, getStyleDisplayName, invertColor } from '../utils/utils.js';

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
      pickerColor: ''
    };
  },
  watch: {
    displayValue: {
      immediate: true,
      handler(value) {
        if (value.startsWith('#')) {
          this.pickerColor = value;
        }
      }
    }
  },
  computed: {
    displayValue() {
      return getColorFromName(this.colorValue, this.golbalColor);
    },
    colorValue() {
      return this.userConfig[this.config.key] || this.config.value;
    },
    displayName() {
      return getStyleDisplayName(this.config, this.componentName);
    },
    isGlobalColor() {
      return this.colorValue.startsWith('$');
    },
    popoverTrigger() {
      return this.isGlobalColor ? 'click' : 'manual';
    },
    golbalColorList() {
      return Object.keys(this.golbalColor).map((c) => (
        {
          label: getStyleDisplayName(this.golbalColor[c]),
          color: this.golbalColor[c].value,
          value: c,
          colorInvert: invertColor(this.golbalColor[c].value)
        }
      ));
    }
  },
  methods: {
    onListColorClick(e) {
      this.onChange(e.value);
      this.$refs.popover && this.$refs.popover.doClose();
    },
    onPickerChange(e) {
      this.onChange(e);
    },
    onChange(value) {
      this.$emit('onChange', {
        key: this.config.key,
        value
      });
    }
  }
};
</script>