<template>
  <label :for="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="label"
    :aria-describedby="error ? `${label}-error` : null"
    :aria-invalid="error ? true : false"
  />
  <p v-if="error" :id="`${label}-error`" aria-live="assertive">{{ error }}</p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>
