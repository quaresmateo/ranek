import Vue from "vue";
import Vuex from "vuex";
import { api } from "../services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      username: "",
      email: "",
      password: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null,
  },

  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    },
  },

  actions: {
    getUsuario(context) {
      return api.get("/me").then((response) => {
        context.commit("UPDATE_USUARIO", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },

    getUsuarioProdutos({ state, commit }) {
      return api
        .get(`/produto?user_id=${state.usuario.id}&_limit=100`)
        .then((response) => {
          commit("UPDATE_USUARIO_PRODUTOS", response.data.data);
        });
    },

    criarUsuario(context, payload) {
      return api.post("/usuario", payload);
    },

    logarUsuario(context, payload) {
      return api
        .login("/login", {
          email: payload.email,
          password: payload.password,
        })
        .then((response) => {
          window.localStorage.token = `Bearer ${response.data.data.token}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        username: "",
        email: "",
        password: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    },
  },
});
