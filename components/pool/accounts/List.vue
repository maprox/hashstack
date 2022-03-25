<template>
  <div>
    <VSheet v-if="loading">
      <VRow>
        <VCol
          v-for="n in 2"
          :key="n"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <VSkeletonLoader
            max-width="300"
            type="card"
          />
        </VCol>
        <VSpacer />
      </VRow>
    </VSheet>
    <VCard
      v-else
      elevation="0"
    >
      <VRow class="align-center">
        <VCol
          v-for="{ userName, pool: { shortName } } in poolAccounts"
          :key="userName"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <PoolAccountsItem
            :type="shortName"
            :name="userName"
            :link="`/pools/${userName}`"
          />
        </VCol>
        <VCol
          class="text-center"
          justify-center
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <VBtn
            elevation="0"
            icon
            x-large
            :loading="creating"
            @click="create"
          >
            <VIcon v-text="'mdi-plus'" />
          </VBtn>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex';

export default {
  name: 'PoolAccountsList',
  data: () => ({
    loading: true,
    creating: false,
    items: [],
  }),
  async fetch() {
    await this.fetchPools();
    await this.fetchPoolAccounts();
  },
  computed: {
    ...mapState({
      pools: ({ pools }) => pools.items,
      poolAccounts: ({ accounts }) => accounts.items,
    }),
  },
  async mounted() {
    if (!this.poolAccounts?.length) {
      await this.fetchPools();
      await this.fetchPoolAccounts();
    }
  },
  methods: {
    ...mapActions({
      createAccount: 'accounts/create',
      fetchAccounts: 'accounts/fetch',
      fetchPools: 'pools/fetch',
    }),
    async fetchPoolAccounts() {
      this.loading = true;
      try {
        await this.fetchAccounts();
      } catch (e) {
        // tbd
      } finally {
        this.loading = false;
      }
    },

    async create() {
      this.creating = true;
      try {
        this.creating = true;
        await this.createAccount({
          poolId: 'd197db08-02ed-4e90-8cf3-3391a803dfd5',
        });
      } finally {
        this.creating = false;
      }
    },
  },
};
</script>
