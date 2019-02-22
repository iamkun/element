<template>
  <div class="action-area">
    <div class="action-button">
      <el-button type="warning" @click.stop="onReset">{{getActionDisplayName("reset-theme")}}</el-button>
      <el-button 
        class="action-button-right" 
        type="primary" 
        :loading=downloading
        @click.stop="onDownload">
        {{getActionDisplayName("download-theme")}}
      </el-button>
    </div>
  </div>
</template>
<style>
.action-area {
  position: fixed;
  bottom: 0;
  background: #F5F7FA;
  height: 70px;
  line-height: 70px;
  width: 23%;
  max-width: 400px;
  box-sizing: border-box;
  right: .6%;
  opacity: .95;
}
.action-button {
  margin-left: calc(16%);
}
.action-button-right {
  margin-left: calc(16%)!important;
}
</style>
<script>
import { getActionDisplayName } from './utils/utils.js';
export default {
  data() {
    return {
      downloading: false
    };
  },
  methods: {
    onReset() {
      this.$parent.visible = false;
      setTimeout(() => {
        window.location.reload(false);
      }, 260);
    },
    getActionDisplayName(key) {
      return getActionDisplayName(key);
    },
    onDownload() {
      this.downloading = true;
      this.$parent.onDownload()
        .then()
        .catch((err) => {
          this.$parent.onError(err);
        })
        .then(() => {
          this.downloading = false;
        });
    }
  }
};
</script>