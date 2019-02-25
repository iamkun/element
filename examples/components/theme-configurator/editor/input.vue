<template>
  <el-input 
    @keyup.enter.native="onUpdate"
    v-model="value"
    @blur="onUpdate"
    v-bind="$attrs"
  ></el-input>
</template>

<script>

export default {
  props: ['val', 'onChange'],
  data() {
    return {
      value: '',
      oldValue: ''
    };
  },
  methods: {
    onUpdate(e) {
      const { value } = e.target;
      if (value !== this.oldValue) {
        this.oldValue = value;
        this.$emit('change', value);
      }
    }
  },
  watch: {
    val: {
      immediate: true,
      handler(value) {
        this.value = value;
        if (!this.oldValue) {
          this.oldValue = value;
        }
      }
    }
  }
};
</script>