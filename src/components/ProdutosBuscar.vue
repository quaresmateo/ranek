<template>
  <form>
    <input
      type="text"
      name="busca"
      id="busca"
      v-model="busca"
      placeholder="Buscar"
    />
    <input
      type="submit"
      id="lupa"
      value="Buscar"
      @click.prevent="buscarProdutos"
    />
  </form>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#busca {
  width: 100%;
  padding: 20px;
  border: none;
}

#busca:hover,
#busca:focus {
  outline: none;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}

#lupa {
  background: url("../assets/search.svg") no-repeat center center;
  border: none;
  box-shadow: none;
  cursor: pointer;
  height: 62px;
  position: absolute;
  width: 60px;
  right: 0px;
  text-indent: -150px;
  top: 0px;
}
</style>
