<template>
  <div class="main">
    <span>{{configName}}</span>
    <div v-for="(config, key) in currentConfig.config" :key="key">
      <color-editor
        :config=config
        :userConfig=userConfig[filterConfigType]
        @onChange=onChange
      ></color-editor>
    </div>
  </div>
</template>

<style>
.main {
  margin-bottom: 200px;
  padding: 10px;
}
</style>

<script>
import { updateVars } from './utils/api.js';
import ColorEditor from './editor/color';

export default {
  components: {
    ColorEditor
  },
  props: {
    currentConfig: {
      type: Object
    }
  },
  data() {
    return {
      userConfig: {
        global: {},
        local: {}
      }
    };
  },
  computed: {
    configName() {
      return this.currentConfig.name;
    },
    filterConfigType() {
      switch (this.configName.toLowerCase()) {
        case 'color':
          return 'global';
        default:
          return 'local';
      }
    }
  },
  methods: {
    onChange(e) {
      this.$set(this.userConfig[this.filterConfigType], e.key, e.value);
      this.onAction();
    },
    onAction() {
      updateVars(this.userConfig)
        .then((res) => {
          const id = 'chalk-style';
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.setAttribute('id', id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = res.replace(/@font-face{[^}]+}/, '');
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    }
  }
};
</script>