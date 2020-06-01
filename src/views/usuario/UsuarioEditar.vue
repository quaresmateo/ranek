<template>
  <section>
    <ErroNotificacao :erros="erros" />
    <UsuarioForm>
      <button class="btn" @click.prevent="atualizarUsuario">
        Atualizar Dados
      </button>
    </UsuarioForm>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
export default {
  name: "UsuarioEditar",
  components: {
    UsuarioForm,
  },
  data() {
    return {
      erros: [],
    };
  },
  methods: {
    atualizarUsuario() {
      this.erros = [];
      api
        .put("/users", this.$store.state.usuario)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push({ name: "usuario" });
        })
        .catch((error) => {
          this.erros.push(error.response.message);
        });
    },
  },
};
</script>

<style></style>
