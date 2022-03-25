import { computed, ref, useContext } from '@nuxtjs/composition-api';

async function loadAccounts() {
  const { $config, $axios } = useContext();
  const { data } = await $axios.get(`${$config.apiUri}/v1/pool/account/list`);
  return data;
}
async function getAccount(params) {
  const { $config, $axios } = useContext();
  const { data } = await $axios.get(`${$config.apiUri}/v1/pool/account/get`, params);
  return data;
}
async function createAccount(params) {
  const { $config, $axios } = useContext();
  const { data } = await $axios.post(`${$config.apiUri}/v1/pool/account/create`, params);
  return data;
}
async function removeAccount(params) {
  const { $config, $axios } = useContext();
  const { data } = await $axios.delete(`${$config.apiUri}/v1/pool/account/delete`, params);
  return data;
}

export function useAccount() {
  const accounts = ref([]);
  const loading = ref(false);

  const load = async () => {
    loading.value = true;
    accounts.value = await loadAccounts();
    loading.value = false;
  };
  const get = async (params) => {
    loading.value = true;
    accounts.value = await getAccount(params);
    loading.value = false;
  };
  const create = async (params) => {
    loading.value = true;
    accounts.value = await createAccount(params);
    loading.value = false;
  };
  const remove = async (params) => {
    loading.value = true;
    accounts.value = await removeAccount(params);
    loading.value = false;
  };

  return {
    load,
    get,
    create,
    remove,
    loading: computed(() => loading.value),
    accounts: computed(() => accounts.value),
  };
}

export default useAccount;
