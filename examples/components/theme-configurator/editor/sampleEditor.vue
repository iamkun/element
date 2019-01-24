<template>
  <section class="config" :key="displayName">
    <div class="config-label">
      {{displayName}}
    </div>
    <div class="config-content">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<style lang="postcss">

</style>

<script>
import Mixin from './mixin';

export default {
  props: {
    componentName: {
      type: String
    }
  },
  data() {
    return {
      options: [],
      value: ''
    };
  },
  mixins: [Mixin],
  computed: {
    displayName() {
      return '1';
    }
  }
};
</script>