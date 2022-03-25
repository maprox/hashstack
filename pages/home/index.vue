<template>
  <div>
    <PoolAccountsTabs />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const { i18n } = useContext();

    // set page title
    useMeta({ title: i18n.t('Home') });

    const drawer = ref(false);
    return {
      drawer,
    };
  },
  // You need to define an empty head to activate meta functionality
  head: {},
});
</script>
