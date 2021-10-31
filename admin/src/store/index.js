import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

/*******  State ************/
const state = {
  /*user*/
  userLoggedIn: {},
  userLogged: false,
  allUsers: [],
  /*page*/
  page: "",
  /*refuges*/
  refuges: [],
  selectedRefuge: "",
  accueilPage: [],
  /*chiens*/
  chiens: [],
  recapchiens: [],
  onechien: {},
  chienToUpdate: {},
  reserves: [],
  optionnes: [],
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
  getAllUsers: () => {
    return state.allUsers;
  },
  /*page*/
  getPage: () => {
    return state.page;
  },

  /*refuges*/
  getRefuges: () => {
    return state.refuges;
  },
  getSelectedRefuge: () => {
    return state.selectedRefuge;
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
  getOneChiens: () => {
    return state.onechien;
  },
  getChienToUpdate: () => {
    return state.chienToUpdate;
  },
  getReserves: () => {
    return state.reserves;
  },
  getOptionnes: () => {
    return state.optionnes;
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
  SET_GET_ALL_USERS: (state, users) => {
    state.allUsers = users;
  },
  /*page*/
  SET_PAGE: (state, page) => {
    state.page = page;
  },
  /*refuges*/
  SET_REFUGES: (state, refuge) => {
    state.refuges = refuge;
  },
  SET_SELECTED_REFUGE: (state, refuge) => {
    state.selectedRefuge = refuge;
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
  SET_ONE_CHIEN: (state, chien) => {
    state.onechien = chien;
  },
  SET_CHIEN_TO_UPDATE: (state, chien) => {
    state.chienToUpdate = chien;
  },
  SET_RESERVES: (state, chiens) => {
    state.reserves = chiens;
  },
  SET_OPTIONNES: (state, chiens) => {
    state.optionnes = chiens;
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
  getAllUsers: ({ commit }, users) => {
    commit("SET_GET_ALL_USERS", users);
  },
  /*page */
  getPage: ({ commit }, page) => {
    commit("SET_PAGE", page);
  },
  /****refuges */
  getRefuges: ({ commit }, refuge) => {
    commit("SET_REFUGES", refuge);
  },
  getSelectedRefuge: ({ commit }, refuge) => {
    commit("SET_SELECTED_REFUGE", refuge);
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
  getOneChiens: ({ commit }, chien) => {
    commit("SET_ONE_CHIEN", chien);
  },
  getChienToUpdate: ({ commit }, chien) => {
    commit("SET_CHIEN_TO_UPDATE", chien);
  },
  getReserves: ({ commit }, chiens) => {
    commit("SET_RESERVES", chiens);
  },
  getOptionnes: ({ commit }, chiens) => {
    commit("SET_OPTIONNES", chiens);
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
