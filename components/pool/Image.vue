<template>
  <VImg
    :src="`/coins/${shortName}.svg`"
    :alt="fullName"
    :width="size"
    :height="size"
    contain
  />
</template>

<script>
export default {
  name: 'PoolImage',
  props: {
    shortName: {
      type: String,
      default: null,
    },
    fullName: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 64,
    },
  },
};
</script>
