<template>
  <VApp>
    <MainNavigationDrawer v-model="drawer" clipped fixed />
    <MainToolbar v-model="drawer" />
    <VMain>
      <VContainer fluid fill-height>
        <VLayout class="align-center justify-center">
          <VCard height="400" color="transparent" flat>
            <div class="display-3 mt-5">
              {{ errorMessage }}
            </div>
            <div class="grey--text lighten-5">
              <br>
              <br>
              {{ errorDescription }}
            </div>
            <div class="paragraph-text mt-2">
              <br>
              <br>
              Try going back to home page and repeating your action.
              Or, contact helpdesk for support.
            </div>
          </VCard>
        </VLayout>
      </VContainer>
    </VMain>
  </VApp>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      drawer: false,
    };
  },
  head() {
    return {
      title: this.errorMessage,
    };
  },
  computed: {
    errorMessage() {
      return this.error.statusCode === 404
        ? this.pageNotFound
        : this.otherError;
    },
    errorDescription() {
      return this.error.statusCode === 404
        ? `
          The page you are trying to get to never existed in this reality,
          or has migrated to a parallel universe.
          `
        : `
          Unknown error.
          `;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
