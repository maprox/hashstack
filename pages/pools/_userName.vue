<template>
  <div>
    <pre>{{ poolAccount }}</pre>
    <VSpacer />
    <VBtn @click="remove">
      Delete
    </VBtn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PoolsItemPage',
  data() {
    return {
      // workerName,
    };
  },
  async fetch() {
    await this.fetchPoolAccounts();
  },
  head({ $i18n }) {
    return {
      title: $i18n.t('PoolAccounts'),
    };
  },
  computed: {
    ...mapGetters({
      getAccountByUserName: 'accounts/getAccountByUserName',
    }),
    poolAccount() {
      const { userName } = this.$route.params;
      return this.getAccountByUserName(userName) || {};
    },
  },
  methods: {
    ...mapActions({
      deleteAccount: 'accounts/delete',
      fetchAccounts: 'accounts/fetch',
    }),
    async fetchPoolAccounts() {
      this.loading = true;
      try {
        await this.fetchAccounts();
        // eslint-disable-next-line no-underscore-dangle
        if (!this.poolAccount?._id) {
          await this.$router.push('/pools');
        }
      } catch (e) {
        // tbd
      } finally {
        this.loading = false;
      }
    },
    remove() {
      this.deleteAccount(this.poolAccount);
      this.$router.push('/pools');
    },
  },
};
</script>
