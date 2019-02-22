<script>
  import bus from '../../bus';
  const varMap = [
    '$--font-size-extra-large',
    '$--font-size-large',
    '$--font-size-medium',
    '$--font-size-base',
    '$--font-size-small',
    '$--font-size-extra-small'
  ];
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
        'font_size_extra_large': '20px',
        'font_size_large': '18px',
        'font_size_medium': '16px',
        'font_size_base': '14px',
        'font_size_small': '13px',
        'font_size_extra_small': '12px'
      }
    },
    watch: {
      global: {
        handler(value) {
          Object.keys(value).forEach((v) => {
            if (varMap.indexOf(v) > -1) {
              this[v.replace('$--', '').replace(/-/g, '_')] = value[v]
            }
          });
        }
      }
    },
  }
</script>
<style>
  .demo-typo-size {
    .color-dark-light {
      color: #99a9bf;
    }
  }
  .demo-term-box img{
    width: 23%;
    margin: 0 4% 20px 0;
  }

  .lineH-left {
    display: inline-block;
    width: 50%;
  }
  .lineH-right {
    width: 30%;
    display: inline-block;
    list-style: none;
    padding: 3px 0 0 90px;
    margin: 0;
    vertical-align: top;
  }
  .lineH-right li{
    font-size: 14px;
    color: #666;
    padding-bottom: 10px;
  }
  .lineH-right li span{
    float: right;
    padding-right: 40px;
  }
</style>

## Typography 字体

我们对字体进行统一规范，力求在各个操作系统下都有最佳展示效果。

### 字体
<div class="demo-term-box">
<img src="../../assets/images/term-pingfang.png" alt="">
<img src="../../assets/images/term-hiragino.png" alt="">
<img src="../../assets/images/term-microsoft.png" alt="">
<img src="../../assets/images/term-sf.png" alt="">
<img src="../../assets/images/term-helvetica.png" alt="">
<img src="../../assets/images/term-arial.png" alt="">
</div>

### 字号

<table class="demo-typo-size">
  <tbody>
  <tr
    >
      <td>层级</td>
      <td>字体大小</td>
      <td class="color-dark-light">举例</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_extra_small }"
    >
      <td class="text-smaller">辅助文字</td>
      <td class="color-dark-light">{{font_size_extra_small}} Extra Small</td>
      <td class="text-smaller">用 Element 快速搭建页面</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_small }"
    >
      <td class="text-small">正文（小）</td>
      <td class="color-dark-light">{{font_size_small}} Small</td>
      <td class="text-small">用 Element 快速搭建页面</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_base }"
    >
      <td class="text-regular">正文</td>
      <td class="color-dark-light">{{font_size_base}} Base</td>
      <td class="text-regular">用 Element 快速搭建页面</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_medium }"
    >
      <td class="h3">小标题</td>
      <td class="color-dark-light">{{font_size_medium}} Medium</td>
      <td class="h3">用 Element 快速搭建页面</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_large }"
    >
      <td>标题</td>
      <td class="color-dark-light">{{font_size_large}} large</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
    :style="{ fontSize: font_size_extra_large }"
    >
      <td>主标题</td>
      <td class="color-dark-light">{{font_size_extra_large}} Extra large</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
  </tbody>
</table>

### 行高

<div>
<img class="lineH-left" src="~examples/assets/images/typography.png" />
<ul class="lineH-right">
<li>line-height:1 <span>无行高</span></li>
<li>line-height:1.3 <span>紧凑</span></li>
<li>line-height:1.5 <span>常规</span></li>
<li>line-height:1.7 <span>宽松</span></li>
</ul>
</div>

### Font-family 代码

```css
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
```
