<template>
  <ul v-if="paginasTotal">
    <li v-for="pagina in paginasTotal" :key="pagina">
      <router-link :to="{ query: query(pagina) }">
        {{ pagina }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProdutosPaginar",
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      const currentQuery = this.$route.query;
      return {
        ...currentQuery,
        _page: pagina,
      };
    },
  },
  computed: {
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;

      return total != Infinity ? Math.ceil(total) : 0;
    },
  },
};
</script>

<style>
li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 4px;
  margin: 4px;
}

li a.router-link-exact-active {
  background: #87f;
  color: #fff;
}

li a:hover {
  background: #a9f;
  color: #fff;
}

ul {
  grid-column: 1/-1;
}
</style>
