const stateData = () => ({
  items: [
    // {
    //   _id: 'd197db08-02ed-4e90-8cf3-3391a803dfd5',
    //   shortName: 'DCR',
    //   fullName: 'Decred',
    //   schemaAvailable: [
    //     1,
    //   ],
    //   stratumServers: [],
    // },
  ],
});

const mutations = {
  setItems(state, items) {
    state.items = items;
  },
};

const API_URL = 'https://api2.hashstack.net';

const actions = {
  async fetch({ commit, state }) {
    if (state.items.length) {
      return state.items;
    }
    const { data } = await this.$axios.get(`${API_URL}/v1/pool/list`);
    commit('setItems', data);
    return data;
  },
};

const getters = {
  getPoolByPoolId: ({ items }) =>
    poolId => items.find(item => item.poolId === poolId),
};

export default {
  namespaced: true,
  state: stateData,
  mutations,
  actions,
  getters,
};
