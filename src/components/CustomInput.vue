<template>
  <input type="text" :value="modelValue" @input="updateModelValue" />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateModelValue(event) {
      const newValue = event.target.value;
      this.$emit('update:modelValue', newValue);
    },
  },
};
</script>

<style scoped>
/* 這裡可以添加自定義的樣式 */
</style>
