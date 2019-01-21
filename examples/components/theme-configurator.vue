<template>
  <div>
    <el-button type="text" @click.stop="showConfigurator">Theme</el-button>
    <div v-if="visible" class="configurator">
      <el-input
        v-model="primaryColor"
        placeholder="$--color-primary"
        @blur="onBlur"
        @keyup.enter.native="onBlur"
      ></el-input>
    </div>
  </div>
</template>

<style>
.configurator {
  height: 100%;
  width: 300px;
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  border-left: 1px solid #eee;
  background: #fff;
}
</style>

<script>
export default {
  data() {
    return {
      visible: false,
      primaryColor: ''
    };
  },

  methods: {
    showConfigurator() {
      this.visible = !this.visible;
    },
    onBlur() {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const id = 'chalk-style';
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.setAttribute('id', id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = xhr.responseText.replace(/@font-face{[^}]+}/, '');
        }
      };
      xhr.open('POST', 'http://localhost:3008/');
      xhr.send(JSON.stringify({
        primaryColor: this.primaryColor
      }));
    }
  }
};
</script>