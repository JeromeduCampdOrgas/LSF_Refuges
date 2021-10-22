import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

/*******  State ************/
const state = {
  /*user*/
  userLoggedIn: {},
  userLogged: false,
  /*refuges*/
  refuges: [],
  accueilPage: [],
  /*chiens*/
  chiens: [],
  recapchiens: [],
};
/*******  Getters    **********/
const getters = {
  /*user*/
  getUserLogged: () => {
    return state.userLogged;
  },
  getUserLoggedIn: () => {
    return state.userLoggedIn;
  },

  /*refuges*/
  getRefuges: () => {
    return state.refuges;
  },
  getAccueilPage: () => {
    return state.accueilPage;
  },
  /*chiens*/
  getChiens: () => {
    return state.chiens;
  },
  getRecapChiens: () => {
    return state.recapchiens;
  },
};
/*******  Mutations  ******** */
const mutations = {
  /*user*/
  SET_USER_LOGGED: (state, logged) => {
    state.userLogged = logged;
  },
  SET_USER_INFOS: (state, user) => {
    state.userLoggedIn = user;
  },

  /*refuges*/
  SET_REFUGES: (state, refuge) => {
    state.refuges = refuge;
  },
  SET_ACCUEIL_PAGE: (state, accueilPage) => {
    state.accueilPage = accueilPage;
  },
  /*chiens*/
  SET_CHIENS: (state, chien) => {
    state.chiens = chien;
  },
  SET_RECAP_CHIENS: (state, chiens) => {
    state.recapchiens = chiens;
  },
};
/*******   Actions  ************/
const actions = {
  /*user*/
  getUserLogged: ({ commit }, logged) => {
    commit("SET_USER_LOGGED", logged);
  },
  //id,idAdmin
  getUserInfos: ({ commit }, user) => {
    commit("SET_USER_INFOS", user);
  },

  /****refuges */
  getRefuges: ({ commit }, refuge) => {
    commit("SET_REFUGES", refuge);
  },
  getAccueilPage: ({ commit }, accueilPage) => {
    commit("SET_ACCUEIL_PAGE", accueilPage);
  },
  /****chiens */
  getChiens: ({ commit }, chien) => {
    commit("SET_CHIENS", chien);
  },
  getRecapChiens: ({ commit }, chiens) => {
    commit("SET_RECAP_CHIENS", chiens);
  },
};
export default new Vuex.Store({
  plugins: [persistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
