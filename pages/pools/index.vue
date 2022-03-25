<template>
  <div>
    <PoolAccountsList />
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'PoolsPage',
  setup() {
    const { i18n } = useContext();

    // set page title
    useMeta({ title: i18n.t('PoolAccounts') });
  },
  // You need to define an empty head to activate meta functionality
  head: {},
});
</script>
