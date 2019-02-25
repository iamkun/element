<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content" v-for="(each, key) in valueArr" :key="key">
      <div class="content-10">
        <color-picker 
          size="mini"
          class="colorPicker"
          v-model="each.rgba" 
          @change="val => onInputChange(val, key, 'rgba')"
          show-alpha
        ></color-picker>
      </div>
      <div class="content-25">
        <theme-input  
          size="mini"
          :val="each.x" 
          @change="val => onInputChange(Number(val), key, 'x')"
        >
          <span slot="suffix">X</span>
        </theme-input>
      </div>
      <div class="content-25">
        <theme-input 
          size="mini"
          :val="each.y" 
          @change="val => onInputChange(Number(val), key, 'y')"
        >
          <span slot="suffix">Y</span>
        </theme-input>
      </div>
      <div class="content-25">
        <theme-input 
          size="mini"
          :val="each.blur" 
          @change="val => onInputChange(Number(val), key, 'blur')"
        >
          <span slot="suffix">Blur</span>
        </theme-input>
      </div>
      <div class="content-15">
        -
      </div>
    </div>
  </section>
</template>

<style scoped>
.colorPicker {
  margin-left: 0;
}
.content-25 .el-input__suffix-inner span{
  line-height: 28px;
}
.content-25 {
  box-sizing: border-box;
  width: 25%;
  padding: 0 5px;
  display: inline-block;
  vertical-align: bottom;
}
.config-content {
  padding: 5px 0;
}
</style>
<script>
import Mixin from './mixin';
import Input from './input';
import ColorPicker from './color-picker';
// import { getStyleDisplayValue } from '../utils/utils.js';

export default {
  components: {
    ColorPicker,
    themeInput: Input
  },
  data() {
    return {
      valueArr: []
    };
  },
  mixins: [Mixin],
  methods: {
    onInputChange(e, index, key) {
      const arr = this.valueArr[index];
      arr[key] = e;
      this.valueArr.splice(index, 1, arr);
      this.onChange(
        this.valueArr.map((v) => (`${v.x}px, ${v.y}px, ${v.blur}px, ${v.rgba}`)).join(', ')
      );
    }
  },
  watch: {
    'config.value': {
      immediate: true,
      handler(value) {
        const match = this.mergedValue.match(/(\d+)|(rgba\(.*?\))/g);
        while (match.length) {
          this.valueArr.push({
            x: match[0],
            y: match[1],
            blur: match[2],
            rgba: match[3]
          });
          match.splice(0, 4);
        }
      }
    }
  }
};
</script>