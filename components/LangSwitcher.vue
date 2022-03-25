<template>
  <div>
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      v-text="locale.code"
    />
  </div>
</template>

<script>

export default {
  name: 'LangSwitcher',
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
  },
};
</script>
