<template>
  <div class="main">
    <!-- <span>{{configName}}</span> -->
    <div v-for="(config, key) in configByOrder" :key="key">
      <span 
        v-if="showCategory(config.category, key)"
        class="category-name"
      >
        {{config.category}}
      </span>
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
  margin-bottom: 140px;
  padding: 10px;
}
.category-name {
  font-size: 18px;
  display: block;
  margin: 30px 0;
}
</style>

<script>
import ColorEditor from './editor/color';
import fontWeightEditor from './editor/fontWeight';
import fontSizeEditor from './editor/fontSize';
import fontLineHeightEditor from './editor/fontLineHeight';
import simpleTextEditor from './editor/simpleText';
import { filterConfigType } from './utils/utils.js';

export default {
  components: {
    ColorEditor,
    fontSizeEditor,
    fontLineHeightEditor,
    simpleTextEditor,
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
    },
    configByOrder() {
      return this.currentConfig.config.sort((a, b) => (a.order - b.order));
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
        case 'fontLineHeight':
          return fontLineHeightEditor;
        default:
          return simpleTextEditor;
      }
    },
    onChange(e) {
      this.$emit('onChange', e);
    },
    showCategory(name, key) {
      if (!name) {
        return false;
      }
      if (!this.categoryDisplay[name] || this.categoryDisplay[name] === key) {
        this.categoryDisplay[name] = key;
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      categoryDisplay: {}
    };
  }
};
</script>