<template>
  <div>
    <el-button type="text" @click.stop="showConfigurator">Theme</el-button>
    <div v-if="visible" class="configurator" ref="configurator">
      <div v-if="currentConfig">
        <main-panel
          :currentConfig = "currentConfig"
          :defaultConfig = "defaultConfig"
          :userConfig = "userConfig"
          :globalValue = "globalValue"
          @onChange = "userConfigChange"
        ></main-panel>
      </div>
      <div v-if="init && !currentConfig">
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
import bus from '../../bus';
import { getVars, updateVars } from './utils/api.js';
import mainPanel from './main';
import { filterConfigType, filterGlobalValue, updateDomHeadStyle } from './utils/utils.js';
import DocStyle from './docStyle';
import Loading from './loading';

export default {
  components: {
    mainPanel
  },
  data() {
    return {
      init: false,
      visible: false,
      defaultConfig: null,
      currentConfig: null,
      userConfig: {
        global: {},
        local: {}
      }
    };
  },
  mixins: [DocStyle, Loading],
  computed: {
    globalValue() {
      return filterGlobalValue(this.defaultConfig, this.userConfig);
    }
  },
  methods: {
    showConfigurator() {
      this.visible = !this.visible;
      if (this.init) return;
      this.$nextTick(() => {
        const loading = this.$loading({
          target: this.$refs.configurator
        });
        getVars()
          .then((res) => {
            this.defaultConfig = res;
            this.filterCurrentConfig();
          })
          .catch((err) => {
            console.log('err: ', err);
          })
          .then(() => {
            this.init = true;
            loading.close();
          });
      });
    },
    filterCurrentConfig() {
      this.currentConfig = this.defaultConfig.find((config) => {
        return config.name === this.$route.path.split('/').pop().toLowerCase();
      });
    },
    userConfigChange(e) {
      this.$set(this.userConfig[filterConfigType(this.currentConfig.name)], e.key, e.value);
      this.onAction();
    },
    onAction() {
      this.triggerComponentLoading(true);
      updateVars(this.userConfig)
        .then((res) => {
          updateDomHeadStyle('chalk-style', res);
          this.updateDocs();
        })
        .catch((err) => {
          console.log('err: ', err);
        })
        .then(() => {
          this.triggerComponentLoading(false);
        });
    },
    triggerComponentLoading(val) {
      bus.$emit('user-theme-config-loading', val);
    },
    updateDocs() {
      window.userThemeConfig = JSON.parse(JSON.stringify(this.userConfig));
      bus.$emit('user-theme-config-update', this.userConfig);
      this.updateDocStyle(this.userConfig);
    }
  },
  watch: {
    '$route.path'() {
      this.defaultConfig && this.filterCurrentConfig();
    }
  }
};
</script>