<template>
  <VAppBar
    elevate-on-scroll
    clipped-left
    fixed
    app
  >
    <VAppBarNavIcon @click.stop="local.drawer = !local.drawer" />
    <VToolbarTitle>
      <NuxtLink to="/" v-text="title" />
    </VToolbarTitle>
    <VSpacer />
    <LangSwitcher />
    <VBtn
      v-if="$auth.loggedIn"
      icon
      @click="$auth.logout()"
    >
      <VIcon>mdi-logout</VIcon>
    </VBtn>
  </VAppBar>
</template>

<script>
export default {
  name: 'MainToolbar',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'HashStackOverflow',
    },
  },
  data() {
    return {
      local: {
        drawer: this.value,
      },
    };
  },
  computed: {
    localDrawer() {
      return this.local.drawer;
    },
  },
  watch: {
    value(value) {
      this.local.drawer = value;
    },
    localDrawer(value) {
      this.$emit('input', value);
    },
  },
};
</script>
