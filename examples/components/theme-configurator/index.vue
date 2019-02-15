<template>
  <div>
    <el-button type="text" @click.stop="showConfigurator">Theme</el-button>
    <transition name="fade">
      <div v-show="visible" class="configurator" ref="configurator">
        <div v-if="currentConfig">
          <main-panel
            :currentConfig = "currentConfig"
            :defaultConfig = "defaultConfig"
            :userConfig = "userConfig"
            :globalValue = "globalValue"
            @onChange = "userConfigChange"
          ></main-panel>
          <download-area></download-area>
        </div>
        <div v-if="init && !currentConfig">
          <span>当前页面没有可配置的项目</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.configurator {
  height: 100%;
  width: 20%;
  position: fixed;
  overflow-y: auto;
  top: 80px;
  right: 0;
  bottom: 0;
  border-left: 1px solid #eee;
  background: #fff;
  color: #666;
  line-height: 24px;
  padding-right: 1%;
}
.fade-enter,.fade-leave-to {
    transform:translateX(100%);
}
.fade-enter-active ,.fade-leave-active {
    transition:all 0.3s ease;
}

@media (min-width: 1600px) {
  .configurator {
    padding-right: calc((100% - 1600px) / 2);
  }
}

</style>

<script>
import bus from '../../bus';
import { getVars, updateVars } from './utils/api.js';
import mainPanel from './main';
import { filterConfigType, filterGlobalValue, updateDomHeadStyle } from './utils/utils.js';
import DocStyle from './docStyle';
import Loading from './loading';
import DownloadArea from './download';

export default {
  components: {
    mainPanel,
    DownloadArea
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
      },
      lastApply: 0
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
      bus.$emit('user-theme-config-visible', this.visible);
      window.userThemeConfigVisible = Boolean(this.visible);
      if (this.init) return;
      this.$nextTick(() => {
        const loading = this.$loading({
          target: this.$refs.configurator
        });
        let defaultConfig;
        getVars()
          .then((res) => {
            defaultConfig = res;
          })
          .catch((err) => {
            console.log('err: ', err);
          })
          .then(() => {
            setTimeout(() => {
              if (defaultConfig) {
                this.defaultConfig = defaultConfig;
                this.filterCurrentConfig();
                this.init = true;
              }
              loading.close();
            }, 300); // action after transition
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
    applyStyle(res, time) {
      if (time < this.lastApply) return;
      updateDomHeadStyle('chalk-style', res);
      this.updateDocs();
      this.lastApply = time;
    },
    onDownload() {
      return updateVars(Object.assign({}, this.userConfig, {download: true}), (xhr) => {
        xhr.responseType = 'blob';
      });
    },
    onAction() {
      this.triggerComponentLoading(true);
      const time = +new Date();
      updateVars(this.userConfig)
        .then((res) => {
          this.applyStyle(res, time);
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