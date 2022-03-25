<template>
  <div class="text-center mt-10">
    <VProgressCircular
      :size="170"
      :width="10"
      color="green"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  async mounted() {
    await this.$auth.loginWith('keycloak');
  },
};
</script>
