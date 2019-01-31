<template>
  <div class="action-area">
    <div class="action-button">
      <el-button type="warning" @click.stop="onReset">重置</el-button>
      <el-button class="action-button-right" type="primary" @click.stop="onDownload">下载</el-button>
    </div>
  </div>
</template>
<style>
.action-area {
  position: fixed;
  bottom: 0;
  background: #FFF;
  height: 70px;
  line-height: 70px;
  width: 100%;
  opacity: .95;
}
.action-button {
  margin-left: calc(4%);
}
.action-button-right {
  margin-left: calc(2%)!important;
}
</style>
<script>
export default {
  methods: {
    onReset() {
      return;
    },
    onDownload() {
      this.$parent.onDownload()
        .then()
        .catch((e) => {
          console.log('e: ', e);
        });
    }
  }
};
</script>