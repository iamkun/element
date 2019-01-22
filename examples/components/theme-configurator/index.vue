<template>
  <div>
    <el-button type="text" @click.stop="showConfigurator">Theme</el-button>
    <div v-if="visible" class="configurator">
      <div v-if="currentConfig">
        <main-panel
          :currentConfig = "currentConfig"
        ></main-panel>
      </div>
      <div v-else>
        <span>当前页面没有可配置的项目</span>
      </div>
    </div>
  </div>
</template>

<style>
.configurator {
  height: 100%;
  width: 300px;
  position: fixed;
  overflow-y: auto;
  top: 80px;
  right: 0;
  bottom: 0;
  border-left: 1px solid #eee;
  background: #fff;
  color: #666;
  line-height: 24px;
}
</style>

<script>
import { getVars } from './utils/api.js';
import mainPanel from './main';

export default {
  components: {
    mainPanel
  },
  data() {
    return {
      visible: false,
      defaultConfig: null,
      currentConfig: null
    };
  },
  mounted() {
    getVars()
      .then((res) => {
        this.defaultConfig = res;
        this.filterCurrentConfig();
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  },
  methods: {
    showConfigurator() {
      this.visible = !this.visible;
    },
    filterCurrentConfig() {
      this.currentConfig = this.defaultConfig.find((config) => {
        return config.name.toLowerCase() === this.$route.path.split('/').pop().toLowerCase();
      });
    }
  },
  watch: {
    '$route.path'() {
      this.defaultConfig && this.filterCurrentConfig();
    }
  }
};
</script>