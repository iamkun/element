<template>
  <div class="main">
    <span>{{configName}}</span>
    <div v-for="(config, key) in currentConfig.config" :key="key">
      <color-editor
        v-if="config.type === 'color'"
        :componentName=configName
        :config=config
        :userConfig=userConfigByType
        :golbalColor=globalValue.color
        @onChange=onChange
      ></color-editor>
      <font-weight-editor
        v-if="config.type === 'fontWeight'"
        :componentName=configName
        :userConfig=userConfigByType
        :golbalValue=globalValue
        :config=config
        @onChange=onChange
      ></font-weight-editor>
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
import { filterConfigType } from './utils/utils.js';

export default {
  components: {
    ColorEditor,
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
    onChange(e) {
      this.$emit('onChange', e);
    }
  }
};
</script>