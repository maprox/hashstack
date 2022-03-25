<template>
  <VFooter
    :absolute="absolute"
    app
  >
    <span>{{ title }} &copy; {{ new Date().getFullYear() }}</span>
  </VFooter>
</template>

<script>
export default {
  name: 'MainFooter',
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'HashStack',
    },
  },
};
</script>
