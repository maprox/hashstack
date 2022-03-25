import { computed, ref, useContext } from '@nuxtjs/composition-api';

async function getPools() {
  const { $config, $axios } = useContext();
  const { data } = await $axios.get(`${$config.apiUri}/v1/pool/list`);
  return data;
}

export function usePool() {
  const pools = ref([]);
  const loading = ref(false);
  const load = async () => {
    loading.value = true;
    pools.value = await getPools();
    loading.value = false;
  };

  return {
    load,
    loading: computed(() => loading.value),
    pools: computed(() => pools.value),
  };
}

export default usePool;
