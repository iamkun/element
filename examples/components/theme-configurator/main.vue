<template>
  <div class="main">
    <span>{{configName}}</span>
    <div v-for="(config, key) in currentConfig.config" :key="key">
      <component 
        :is="editorComponent(config.type)"
        :componentName=configName
        :config=config
        :userConfig=userConfigByType
        :golbalValue=globalValue
        @onChange=onChange
      >
      </component>
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
import ColorEditor from './editor/color';
import fontWeightEditor from './editor/fontWeight';
import fontSizeEditor from './editor/fontSize';
import { filterConfigType } from './utils/utils.js';

export default {
  components: {
    ColorEditor,
    fontSizeEditor,
    fontWeightEditor
  },
  props: {
    defaultConfig: {
      type: Array
    },
    currentConfig: {
      type: Object
    },
    userConfig: {
      type: Object
    },
    globalValue: {
      type: Object
    }
  },
  computed: {
    configName() {
      return this.currentConfig.name;
    },
    userConfigByType() {
      return this.userConfig[filterConfigType(this.configName)];
    }
  },
  methods: {
    editorComponent(type) {
      switch (type) {
        case 'color':
          return ColorEditor;
        case 'fontWeight':
          return fontWeightEditor;
        case 'fontSize':
          return fontSizeEditor;
        default:
          return;
      }
    },
    onChange(e) {
      this.$emit('onChange', e);
    }
  }
};
</script>