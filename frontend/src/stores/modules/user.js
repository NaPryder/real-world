
const baseUrl = 'http://127.0.0.1:3000'
const headers = { "Content-Type": "application/json" }


export default {
  state: () => ({
    baseUrl : baseUrl,
    loginUrl: baseUrl + "/api/users/login",
    token: '',
    isLogin: false,
  }),
  getters: {},
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {},

}