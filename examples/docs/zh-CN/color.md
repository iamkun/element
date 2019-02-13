<script>
  import bus from '../../bus';
  import { tintColor } from '../../color.js';
  const domColorMap = {
    '$--color-primary': '.bg-blue',
    '$--color-success': '.bg-success',
    '$--color-warning': '.bg-warning',
    '$--color-danger': '.bg-danger',
    '$--color-info': '.bg-info',
    '$--color-text-primary': '.bg-text-primary',
    '$--color-text-regular': '.bg-text-regular',
    '$--color-text-secondary': '.bg-text-secondary',
    '$--color-text-placeholder': '.bg-text-placeholder',
    '$--border-color-base': '.bg-border-base',
    '$--border-color-light': '.bg-border-light',
    '$--border-color-lighter': '.bg-border-lighter',
    '$--border-color-extra-light': '.bg-border-extra-light'
  };
  const domColorUpdate = (domClass, color) => {
    document.querySelectorAll(`.demo-color-box${domClass}`)[0].style.backgroundColor = color;
    document.querySelectorAll(`.demo-color-box${domClass} .value`)[0].innerText = color;
  };
  export default {
    created() {
      bus.$on('user-theme-config-update', this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
      }
    },
    watch: {
      global: {
        handler(value) {
          Object.keys(value).forEach((color) => {
            if (domColorMap[color]) {
              domColorUpdate(domColorMap[color], value[color])
            }
          });
        }
      }
    },
  }
</script>

<style>
  .demo-color-box {
    position: relative;
    border-radius: 4px;
    padding: 20px;
    margin: 5px 0;
    height: 114px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }
  .demo-color-box-other {
    height: 74px;
    margin: 10px 0!important;
    border-radius: 4px 4px 4px 4px!important;
  }
  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
      margin: 0;
    }
    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }
    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
  .bg-blue {
    background-color: #409EFF;
  }

  .bg-success {
    background-color: #67C23A;
  }
  .bg-warning {
    background-color: #E6A23C;
  }
  .bg-danger {
    background-color: #F56C6C;
  }
  .bg-info {
    background-color: #909399;
  }

  .bg-text-primary {
    background-color: #303133;
  }
  .bg-text-regular {
    background-color: #606266;
  }
  .bg-text-secondary {
    background-color: #909399;
  }
  .bg-text-placeholder {
    background-color: #c0c4cc;
  }

  .bg-border-base {
    background-color: #dcdfe6;
  }
  .bg-border-light {
    background-color: #e4e7ed;
  }
  .bg-border-lighter {
    background-color: #ebeef5;
  }
  .bg-border-extra-light {
    background-color: #f2f6fc;
  }

  [class*=" bg-border-"] {
    color: #303133;
  }
  .bg-color-sub {
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    position: absolute;
    border-radius: 0 0 4px 4px;
  }
  .bg-blue-sub-item {
    width: 11.1111111%;
    height: 100%;
    display: inline-block;
  }
  .bg-blue-sub-item:first-child {
    border-radius: 0 0 0 4px;
  }
  .bg-success-sub-item {
    width: 50%;
    height: 100%;
    display: inline-block;
  }
  .bg-success-sub-item:first-child {
    border-radius: 0 0 0 4px;
  }
  .bg-success-sub-item:last-child {
    border-radius: 0 0 4px 0;
  }
  .bg-transparent {
    border: 1px solid #FCC3C3;
    color: #666;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M0 98 L100 0 L100 1 L1 98' fill='#FCC3C3' /></svg>");
    background-repeat:no-repeat;
    background-position:center center;
    background-size: 100% 100%, auto;
  }
</style>

## Color 色彩

Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

### 主色

Element 主要品牌颜色是鲜艳、友好的蓝色。

<el-row :gutter="12">
  <el-col :span="10" :xs="{span: 12}">
    <div class="demo-color-box bg-blue">Brand Color<div class="value">#409EFF</div>
    <div 
      class="bg-color-sub"
      :style="{ background: tintColor('#409EFF', 0.9) }"
    >
    <div 
      class="bg-blue-sub-item" 
      v-for="(item, key) in Array(8)"
      :key="key"
      :style="{ background: tintColor('#409EFF', (key + 1) / 10) }"
        >
    </div>
    </div>
  </el-col>
</el-row>

### 辅助色

除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box bg-success">Success<div class="value">#67C23A</div>
      <div 
        class="bg-color-sub"
      >
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor('#67C23A', (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box bg-warning">Warning<div class="value">#E6A23C</div>
      <div 
          class="bg-color-sub"
        >
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor('#E6A23C', (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box bg-danger">Danger<div class="value">#F56C6C</div>
      <div 
          class="bg-color-sub"
        >
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor('#F56C6C', (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box bg-info">Info<div class="value">#909399</div>
      <div 
          class="bg-color-sub"
        >
        <div 
          class="bg-success-sub-item" 
          v-for="(item, key) in Array(2)"
          :key="key"
          :style="{ background: tintColor('#909399', (key + 8) / 10) }"
            >
        </div>
      </div>
    </div>
  </el-col>
</el-row>

### 中性色

中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。

<el-row :gutter="12">
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other bg-text-primary">主要文字<div class="value">#303133</div></div>
      <div class="demo-color-box demo-color-box-other bg-text-regular">常规文字<div class="value">#606266</div></div>
      <div class="demo-color-box demo-color-box-other bg-text-secondary">次要文字<div class="value">#909399</div></div>
      <div class="demo-color-box demo-color-box-other bg-text-placeholder">占位文字<div class="value">#C0C4CC</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other bg-border-base">一级边框<div class="value">#DCDFE6</div></div>
      <div class="demo-color-box demo-color-box-other bg-border-light">二级边框<div class="value">#E4E7ED</div></div>
      <div class="demo-color-box demo-color-box-other bg-border-lighter">三级边框<div class="value">#EBEEF5</div></div>
      <div class="demo-color-box demo-color-box-other bg-border-extra-light">四级边框<div class="value">#F2F6FC</div></div>
    </div>
  </el-col>
  <el-col :span="6" :xs="{span: 12}">
    <div class="demo-color-box-group">
      <div 
      class="demo-color-box demo-color-box-other"
      :style="{ background: '#000000' }"
      >基础黑色<div class="value">#000000</div></div>
      <div
      class="demo-color-box demo-color-box-other"
      :style="{ background: '#FFFFFF', color: '#000', border: '1px solid #000' }"
      >基础白色<div class="value">#FFFFFF</div></div>
      <div class="demo-color-box demo-color-box-other bg-transparent">透明<div class="value">Transparent</div>
    </div>
  </el-col>
</el-row>
