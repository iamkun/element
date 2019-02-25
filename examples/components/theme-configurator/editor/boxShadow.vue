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
          show-alpha
        ></color-picker>
      </div>
      <div class="content-20">
        <el-input 
          size="mini"
          @keyup.enter.native="onUpdate"
          v-model="each.x" 
        >
          <span slot="suffix">X</span>
        </el-input>
      </div>
      <div class="content-20">
        <el-input 
          size="mini"
          @keyup.enter.native="onUpdate"
          v-model="each.y" 
        >
          <span slot="suffix">Y</span>
        </el-input>
      </div>
      <div class="content-20">
        <el-input 
          size="mini"
          @keyup.enter.native="onUpdate"
          v-model="each.blur" 
        >
          <span slot="suffix">Blur</span>
        </el-input>
      </div>
    </div>
  </section>
</template>

<style scoped>
.colorPicker {
  margin-left: 0;
}
.content-20 .el-input__suffix-inner span{
  line-height: 28px;
}
.content-20 {
  padding-left: 5px;
}

</style>
<script>
import Mixin from './mixin';
import ColorPicker from './color-picker';
// import { getStyleDisplayValue } from '../utils/utils.js';

export default {
  components: {
    ColorPicker
  },
  data() {
    return {
      value: '',
      pickerColor: '',
      valueArr: []
    };
  },
  mixins: [Mixin],
  methods: {

  },
  computed: {

  },
  watch: {
    'config.value': {
      immediate: true,
      handler(value) {
        const demo = '0 2px 4px rgba(0, 0, 0, .12)';
        const match = demo.match(/(\d+)|(rgba\(.*?\))/g);
        this.value = value;
        this.valueArr.push({
          x: match[0],
          y: match[1],
          blur: match[2],
          rgba: match[3]
        });
      }
    }
  }
};
</script>