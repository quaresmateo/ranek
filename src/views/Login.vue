<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Logar</button>
      <ErroNotificacao :erros="erros" />
      <a class="perdeu">
        <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
      </a>
      <LoginCriar />
    </form>
  </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";
export default {
  components: { LoginCriar },
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        senha: "",
      },
      erros: [],
    };
  },

  created() {
    document.title = "Login";
  },

  methods: {
    logar() {
      this.erros = [];
      this.$store
        .dispatch("logarUsuario", this.login)
        .then(() => {
          this.$store.dispatch("getUsuario");
          this.$router.push("/usuario");
        })
        .catch((erro) => {
          console.log(erro);
          this.erros.push(erro.response.message);
        });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

form {
  display: grid;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
