<template>
  <VTabs show-arrows>
    <VTabsSlider />
    <VTab
      v-for="{ _id, userName, pool: { shortName, fullName } } in accounts"
      :key="_id"
      :href="'#tab-' + _id"
    >
      <PoolImage
        :short-name="shortName"
        :full-name="fullName"
        :size="24"
      />
      <span class="ml-3">{{ userName }}</span>
    </VTab>
  </VTabs>
</template>

<script>
import { defineComponent, onMounted, useFetch } from '@nuxtjs/composition-api';
import { useAccount } from '@/composition/accounts';
import { usePool } from '@/composition/pools';

export default defineComponent({
  name: 'PoolAccountsTabs',
  setup() {
    const { pools, load: loadPools } = usePool();
    const { accounts, load: loadAccounts } = useAccount();

    const fetch = async () => {
      if (!pools.length) {
        await loadPools();
        await loadAccounts();
      }
    };

    useFetch(fetch);
    onMounted(fetch);

    return {
      accounts,
      pools,
    };
  },
});
</script>
