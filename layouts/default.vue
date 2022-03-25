<template>
  <VApp>
    <MainNavigationDrawer v-model="drawer" clipped fixed />
    <MainToolbar v-model="drawer" />
    <VMain>
      <VContainer fluid>
        <Nuxt />
      </VContainer>
    </VMain>
    <MainFooter absolute />
  </VApp>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
