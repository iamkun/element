<template>
  <section class="config" :key="displayName">
    fontWeight
  </section>
</template>

<style lang="postcss">

</style>

<script>
import Mixin from './mixin';

export default {
  props: {
    config: {
      type: Object
    },
    userConfig: {
      type: Object
    },
    componentName: {
      type: String
    }
  },
  data() {
    return {
      pickerColor: ''
    };
  },
  mixins: [Mixin]
};
</script>