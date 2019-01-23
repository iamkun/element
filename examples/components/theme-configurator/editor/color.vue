<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content">
      <div class="content-80">
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
            :value=displayValue
            readonly
            slot="reference"
          ></el-input>
        </el-popover>
      </div>
      <div class="content-20">
        <el-color-picker 
          class="colorPicker"
          v-model="pickerColor" 
          @change=onPickerChange
        ></el-color-picker>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">

.colorPicker {
  margin-left: 10px;
  vertical-align: bottom;
}
.color-list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 400px;
  overflow-x: auto;
  .list-item {
    border: 1px solid #eee;
    margin: 3px;
    text-align: center;
    line-height: 40px;
    height: 40px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      opacity: .8;
      box-shadow: 0 0 8px 0 #eee;
    }
  }
}
</style>

<script>
import Mixin from './mixin';
import { getColorFromName, getStyleDisplayName, invertColor } from '../utils/utils.js';

export default {
  mixins: [Mixin],
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