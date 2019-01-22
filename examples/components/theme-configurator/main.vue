<template>
  <div class="main">
    <span>{{configName}}</span>
    <div v-for="(config, key) in currentConfig.config" :key="key">
      <color-editor
        :config=config
        :userConfig=userConfig[configType]
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
import ColorEditor from './editor/color';
import { filterConfigType } from './utils/utils.js';

export default {
  components: {
    ColorEditor
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
    }
  },
  computed: {
    configName() {
      return this.currentConfig.name;
    },
    configType() {
      return filterConfigType(this.configName);
    }
  },
  methods: {
    onChange(e) {
      this.$emit('onChange', e);
    }
  }
};
</script>