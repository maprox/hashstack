const stateData = () => ({
  items: [
    // {
    //   id: '1',
    //   userId: '33',
    //   userName: 'leetmeet223',
    //   type: 'btc',
    //   disabled: false,
    //   offline: false,
    // },
  ],
});

const mutations = {
  create(state, account) {
    state.items.push(account);
  },
  setItems(state, items) {
    state.items = items;
  },
  deleteItem(state, account) {
    state.items = state.items.filter(({ id }) => id !== account.id);
  },
};

const API_URL = 'https://api2.hashstack.net';

const actions = {
  async create({ commit }, params) {
    const { data } = await this.$axios.post(`${API_URL}/v1/pool/account/create`, params);
    commit('create', data);
    return data;
  },
  async fetch({ commit }) {
    const { data } = await this.$axios.get(`${API_URL}/v1/pool/account/list`);
    commit('setItems', data);
    return data;
  },
  async get({ commit }, params) {
    const { data } = await this.$axios.post(`${API_URL}/v1/pool/account/get`, params);
    commit('setItem', data);
    return data;
  },
  async delete({ commit }, params) {
    const { data } = await this.$axios.delete(`${API_URL}/v1/pool/account/delete`, params);
    commit('deleteItem', params);
    return data;
  },
};

const getters = {
  getAccountByUserName: ({ items }) =>
    userName => items.find(item => item.userName === userName),
};

export default {
  namespaced: true,
  state: stateData,
  mutations,
  actions,
  getters,
};
